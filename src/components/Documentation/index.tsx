import React, { Fragment } from "react";
import {
  DocumentationMembers,
  groupMembers,
} from "../../_core";
import { PrimaryLayout } from "../Layout";
import { Input, Row, Tag } from "antd";
import { SideBar } from "./SideBar";
import { DocumentationCard } from "./Card";
import { observer } from "mobx-react";
import { makeAutoObservable } from "mobx";

export const SearchState = makeAutoObservable({
  search: "",
});

export default observer(
  (props: { documentation: DocumentationMembers; readme: string }) => {
    const members = props.documentation.filter((q) => q.kind === "Function");

    const groupedMembers = groupMembers(members);

    return (
      <PrimaryLayout
        readme={props.readme}
        sideMenu={
          <Fragment>
            <div style={{ padding: 10 }}>
              <Input
                size={"large"}
                placeholder={"Search"}
                onKeyUp={(q) => (SearchState.search = q.currentTarget.value)}
              ></Input>
            </div>
            <SideBar groupedMembers={groupedMembers}></SideBar>
          </Fragment>
        }
      >
        {groupedMembers.map((q) => (
          <div>
            <div>
              {q.members.map((q) => (
                <Fragment>
                  <DocumentationCard docMember={q}></DocumentationCard>
                  <div style={{ height: 10 }}></div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </PrimaryLayout>
    );
  }
);
