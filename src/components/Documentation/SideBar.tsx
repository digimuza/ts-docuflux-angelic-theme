import { Empty, Menu, Tag } from "antd";
import React, { Fragment } from "react";
import { GroupedDocumentationMembers } from "../../_core";
import * as P from "ts-prime";
import { observer } from "mobx-react";
import { SearchState } from ".";

export function tagColor(tag: string) {
  switch (tag.toLowerCase()) {
    case "p":
      return "#fa8c16";
    case "array":
      return "#1890ff";
    case "number":
      return "#006d75";
    case "type":
      return "#08979c";
    case "string":
      return "#7cb305";
    case "object":
      return "#13c2c2";
    case "function":
      return "#0050b3";
    case "guard":
      return "#003a8c";
    case "utility":
      return "#9e1068";
    default:
      return;
  }
}
export const SideBar = observer(
  (props: { groupedMembers: GroupedDocumentationMembers }) => {
    const { groupedMembers } = props;

    const items = groupedMembers.flatMap((q) => {
      return P.sortBy(q.members, (q) => q.name)
        .filter((q) => q.kind === "Function")
        .filter((q) => q.name.includes(SearchState.search))
        .map((q) => {
          return (
            <Menu.Item key={q.canonicalReferenceGroup}>
              <a href={`#link-${q.name}`} key={q.canonicalReference}>
                <div
                  key={q.canonicalReference}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{q.name}</strong>
                  </div>
                  <div>
                    {q.tags
                      .map((q) => (q.value === "Pipe" ? "P" : q.value))
                      .map((cat) => {
                        return <Tag key={cat} color={tagColor(cat)}>{cat}</Tag>;
                      })}
                  </div>
                </div>
              </a>
            </Menu.Item>
          );
        });
    });

    return (
      <div
        className={"side-bar-content"}
        style={{
          height: "calc(100vh - 64px - 72px)",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "90%", borderRight: 0 }}
        >
          {items}
          {items.length === 0 && (
            <Fragment>
              <div style={{ height: 30 }}></div>
              <Empty />
            </Fragment>
          )}
          <div style={{ height: 100 }}></div>
        </Menu>
      </div>
    );
  }
);
