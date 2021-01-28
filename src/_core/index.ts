import * as P from 'ts-prime'
import { DocuFluxDocumentation } from './types'
export function getPackageName(data: DocuFluxDocumentation) {
    return {
        name: data.name,
        version: data.version
    }
}

export function excerptTokensToString(data: ReadonlyArray<DocuFluxDocumentation.ExcerptToken>) {
    return data.map((q) => q.text).join("").replace('declare', '').replace(/\s+/gm, ' ')
}

export function getMembers(data: DocuFluxDocumentation) {
    const members = data.members.find((q) => q.kind === 'EntryPoint')
    if (members == null) throw new Error("Failed to find entry point")
    return P.pipe(
        members.members,
        P.map((w) => {
            return {
                kind: w.kind,
                name: w.name,
                comment: parseComment(w.docComment),
                excerptTokens: w.excerptTokens,
                canonicalReference: w.canonicalReference,
                package: w.canonicalReference.replace(/(!.+)/gm, ''),
                canonicalReferenceGroup: w.canonicalReference.replace(/(:.*)/, '')
            }
        }),
        P.groupBy((q) => q.canonicalReferenceGroup),
        P.mapRecord(([k, v]) => [k, P.omit({ members: v.map((q) => P.omit(q, ['name', 'package'])), ...v[0] }, ['excerptTokens', 'comment'])]),
        P.mapRecord(([k, v]) => {
            const tags = P.pipe(
                v.members,
                P.flatMap((q) =>
                    q.comment.parsed
                        .filter((q) => ["@category", "@pipe"].includes(q.tag))
                        .flatMap((q) => {
                            if (P.isArray(q.content)) {
                                return q.content.map((z) => {
                                    return {
                                        tag: q.tag,
                                        value: z
                                    }
                                });
                            }
                            return [];
                        })
                ),
                P.uniqBy((q) => `${q.tag}/${q.value}`),
                P.filter((q) => q.tag !== "/")
            )

            return [k, { ...v, tags }]
        }),
        P.toPairs,
        P.map(([, v]) => v)
    )
}

export function parseComment(comment: string) {
    const cleanComment = comment.replace("/**", '').replace("*/", '').split(/^[ ]+?\*/gm)
    const row = cleanComment.join("\n").trim().replace(/(@\w+)/gm, "###$1").split("###").map((q) => q.trim())
    const description = row.filter((q) => !/@\w+/.test(q))[0]
    const parsed = row.filter((q) => /@\w+/.test(q)).map((w) => {
        const cc = w.replace(/(@\w+)/, '$1##').split("##")
        const tag = cc[0]
        const content = P.pipe(cc.slice(1), P.flatMap((q) => q.split("\n").map((q) => q.trim()).filter((q) => q)))
        if (tag === '@param') {
            return {
                tag,
                content: content.map((q) => {
                    return {
                        description: q.replace(/\w+/, '').trim().replace(/^-/, '').trim(),
                        name: q.match(/\w+/)?.[0]
                    }
                })[0]
            }
        }
        if (tag === '@example') {
            return {
                tag,
                content: content.map((q) => {
                    return q as string
                })
            }
        }
        return {
            tag,
            content: content
        }
    })
    return {
        description,
        example: '',
        parsed
    }
}

export type DocumentationMembers = ReturnType<typeof getMembers>;

export type GroupedDocumentationMembers = ReturnType<typeof groupMembers>;

export function groupMembers(members: DocumentationMembers) {
    return P.pipe(
        members,
        P.groupBy((q) => {
            const category = q.tags.find((q) => q.tag === "@category");
            if (category == null) {
                return "utils";
            }
            return category.value.toLowerCase();
        }),
        P.toPairs,
        P.map(([group, members]) => {
            return {
                group,
                members,
            };
        })
    );
}

