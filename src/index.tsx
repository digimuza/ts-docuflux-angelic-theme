import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Documentation";
import reportWebVitals from "./reportWebVitals";
import { DocumentationMembers } from "./_core";
import axios from "axios";
import "react-virtualized/styles.css";

type Data = {
  docs: DocumentationMembers;
  articles: {
    readme: string;
  };
};

const getData = async () => {
  const result = await axios.get("/data/data.json");
  return result.data as {
    docs: DocumentationMembers;
    articles: {
      readme: string;
    };
  };
};

const Load = () => {
  const [state, setState] = useState<Data | undefined>(undefined);
  useEffect(() => {
    getData().then((q) => {
      setState(q);
    });
  }, []);
  if (state == null) return null;
  return (
    <App
      key={"app"}
      documentation={state.docs}
      readme={state.articles.readme}
    ></App>
  );
};

ReactDOM.render(<Load />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
