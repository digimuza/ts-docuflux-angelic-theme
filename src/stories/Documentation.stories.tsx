import React from "react";
import App from "../components/Documentation";
import { DocumentationMembers } from "../_core";
import data from "./mock/data.json";
export default {
  title: "App",
  component: App,
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
  <App documentation={mock.docs} readme={mock.articles.readme}></App>
);
