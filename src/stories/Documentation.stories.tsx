import React from "react";
import DocList from "../components/Documentation";
import { DocumentationMembers } from "../_core";
import data from "./mock/data.json";
export default {
  title: "DocList",
  component: DocList,
};

const getMock = () => {
  return data as {
    docs: DocumentationMembers;
    articles: {
      readme: string;
    };
  };
};
const mock = getMock()
export const Empty = () => (
  <DocList documentation={mock.docs} readme={mock.articles.readme}></DocList>
);
