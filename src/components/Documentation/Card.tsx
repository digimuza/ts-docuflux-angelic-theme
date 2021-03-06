import { Card, Tag, Typography } from "antd";
import React, { PropsWithChildren } from "react";
import { DocumentationMembers } from "../../_core";
import * as P from "ts-prime";
import BaseSyntaxHighlighter from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import { tagColor } from "./SideBar";
import { beautify } from "../../_core/utils";
import "./Card.css";
import { Markdown } from "./Markdown";

theme.hljs.padding = "0.5em";
theme.hljs.margin = "0";

export const SyntaxHighlighter = (props: PropsWithChildren<{}>) => {
  return (
    <div style={{ borderRadius: 5, overflow: "hidden" }}>
      <BaseSyntaxHighlighter language={"javascript"} style={{ ...theme }}>
        {props.children}
      </BaseSyntaxHighlighter>
    </div>
  );
};

export const DocumentationCard = (props: {
  docMember: DocumentationMembers[number];
}) => {
  return (
    <Card
      id={`link-${props.docMember.name}`}
      key={`link-${props.docMember.name}`}
      title={
        <Typography.Title level={4}>{props.docMember.name}</Typography.Title>
      }
      style={{ width: "100%" }}
      extra={props.docMember.tags
        .map((q) => (q.value === "Pipe" ? "P" : q.value))
        .map((q) => (
          <Tag key={q} color={tagColor(q)}>{q}</Tag>
        ))}
    >
      <Markdown
        markdown={props.docMember.members[0].comment.description}
      ></Markdown>
      <div style={{ height: 10 }}></div>
      {props.docMember.members[0].comment.parsed
        .filter((q) => q.tag === "@warning")
        .map((q) => {
          if (Array.isArray(q.content)) {
            return (
              <div key={q.tag} className={"warning"}>
                <div className={"dot"}>WARNING</div>
                <div className={"warning-text"}>
                  <Markdown markdown={q.content.join("\n")}></Markdown>
                </div>
              </div>
            );
          }

          return null
        })}
      <div style={{ height: 10 }}></div>
      {props.docMember.members[0].comment.parsed
        .filter((q) => q.tag === "@description")
        .map((q) => {
          if (Array.isArray(q.content)) {
            return <Markdown key={q.tag} markdown={q.content.join("\n")}></Markdown>;
          }

          return null
        })}
      <div style={{ height: 10 }}></div>
      <div>
        <div>
          {P.take(props.docMember.members, 1).map((q) => {
            const example = q.comment.example;
            if (example == null) return null;
            const bExample = beautify(q.comment.example);
            return (
              <div key={q.canonicalReference}>
                <Markdown
                  markdown={`
\`\`\`typescript
${beautify(bExample)}
\`\`\`
`}
                ></Markdown>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 10 }}></div>
      {/* <div>
        <div>
          <SyntaxHighlighter>
            {P.take(props.docMember.members, 2)
              .map((q) => excerptTokensToString(q.excerptTokens))
              .join("\n")}
          </SyntaxHighlighter>
        </div>
      </div> */}
    </Card>
  );
};
