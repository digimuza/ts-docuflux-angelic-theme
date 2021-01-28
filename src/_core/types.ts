export interface DocuFluxDocumentation {
    metadata: DocuFluxDocumentation.Metadata;
    kind: string;
    canonicalReference: string;
    docComment: string;
    name: string;
    version: string;
    members: DocuFluxDocumentation.ObjectMember[];
}
export namespace DocuFluxDocumentation {
    export interface ObjectMember {
        kind: string;
        canonicalReference: string;
        name: string;
        members: Member[];
    }

    export interface Member {
        kind: Member.Kind;
        canonicalReference: string;
        docComment: string;
        excerptTokens: ExcerptToken[];
        returnTypeTokenRange?: TokenRange;
        releaseTag: ReleaseTag;
        overloadIndex?: number;
        parameters?: Parameter[];
        typeParameters?: TypeParameter[];
        name: string;
        typeTokenRange?: TokenRange;
        members?: FluffyMember[];
        extendsTokenRanges?: TokenRange[];
        variableTypeTokenRange?: TokenRange;
        extendsTokenRange?: TokenRange;
        implementsTokenRanges?: any[];
    }
    export namespace Member {
        export enum Kind {
            Class = "Class",
            Function = "Function",
            Interface = "Interface",
            Namespace = "Namespace",
            TypeAlias = "TypeAlias",
            Variable = "Variable",
        }
    }

  

    export enum ExcerptTokenKind {
        Content = "Content",
        Reference = "Reference",
    }

    export interface TokenRange {
        startIndex: number;
        endIndex: number;
    }

    

    export interface FluffyMember {
        kind: FluffyKind;
        canonicalReference: string;
        docComment: string;
        excerptTokens: ExcerptToken[];
        isOptional?: boolean;
        releaseTag: ReleaseTag;
        name?: string;
        propertyTypeTokenRange?: TokenRange;
        returnTypeTokenRange?: TokenRange;
        overloadIndex?: number;
        parameters?: Parameter[];
        typeParameters?: TypeParameter[];
        variableTypeTokenRange?: TokenRange;
        members?: TentacledMember[];
        isStatic?: boolean;
    }

    export enum FluffyKind {
        Constructor = "Constructor",
        Function = "Function",
        Namespace = "Namespace",
        Property = "Property",
        PropertySignature = "PropertySignature",
        Variable = "Variable",
    }

    export interface TentacledMember {
        kind: Member.Kind;
        canonicalReference: string;
        docComment: string;
        excerptTokens: ExcerptToken[];
        releaseTag: ReleaseTag;
        name: string;
        variableTypeTokenRange: TokenRange;
    }
    export interface ExcerptToken {
        kind: ExcerptTokenKind;
        text: string;
        canonicalReference?: string;
    }

    export enum ReleaseTag {
        Public = "Public",
    }

    export interface Parameter {
        parameterName: string;
        parameterTypeTokenRange: TokenRange;
    }

    export interface TypeParameter {
        typeParameterName: TypeParameterName;
        constraintTokenRange: TokenRange;
        defaultTypeTokenRange: TokenRange;
    }

    export enum TypeParameterName {
        A = "A",
        B = "B",
        C = "C",
        D = "D",
        E = "E",
        F = "F",
        G = "G",
        H = "H",
        I = "I",
        Input = "Input",
        K = "K",
        R = "R",
        S = "S",
        T = "T",
        V = "V",
    }

    export interface Metadata {
        toolPackage: string;
        toolVersion: string;
        schemaVersion: number;
        oldestForwardsCompatibleVersion: number;
    }
}