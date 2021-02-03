import { Card, Layout, Menu } from "antd";
import React, { PropsWithChildren } from "react";
import "./themes/light.scss";
import "./themes/dark.scss";
import { Switch } from "antd";

import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import * as P from "ts-prime";
import { Markdown } from "../Documentation/Markdown";
import { observer } from "mobx-react";
import { makeAutoObservable, autorun } from "mobx";
const { Header, Content, Sider } = Layout;

const paths = {
  home: { key: 1, path: "/home", title: "Home" },
  documentation: {
    key: 2,
    path: "/documentation",
    exact: true,
    title: "Documentation",
  },
};

export const THEME_KEY = "ts-prime-theme";
export const ThemeState = makeAutoObservable({
  theme: localStorage.getItem("ts-prime-theme") || "dark",
});

autorun(() => {
  console.log(ThemeState.theme)
  localStorage.setItem(THEME_KEY, ThemeState.theme);
});

const LayoutHeader = observer(() => {
  const route = useRouteMatch();
  const selected = [
    Object.values(paths)
      .find((q) => q.path === route.path)
      ?.key.toString(),
  ].filter(P.isDefined);
  return (
    <Header className="header">
      <Link to={"/home"}>
        <div className={"logo"}>
          <img
            alt={"logo"}
            style={{
              width: 100,
              height: "auto",
            }}
            src={"/logo.svg"}
          ></img>
        </div>
      </Link>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={selected}>
        <Menu.Item key={paths.home.key}>
          <Link to={paths.home.path}>{paths.home.title}</Link>
        </Menu.Item>
        <Menu.Item key={paths.documentation.key}>
          <Link to={paths.documentation.path}>{paths.documentation.title}</Link>
        </Menu.Item>
      </Menu>
      <div className={"flex"}></div>
      <div style={{ paddingRight: 20 }}>
        <Switch
          onChange={(q) => {
            ThemeState.theme = ThemeState.theme === "dark" ? "light" : "dark";
            return;
          }}
          checked={ThemeState.theme === 'light'}
          checkedChildren={"Dark"}
          unCheckedChildren={"Light"}
        ></Switch>
      </div>
      {ThemeState.theme === "dark" ? (
        <div>
          <a href={"https://github.com/digimuza/ts-prime"}>
            <img
              alt={"Github"}
              style={{
                width: "auto",
                height: "30px",
              }}
              src={`/github.white.svg`}
            ></img>
          </a>
        </div>
      ) : (
        <div>
          <a href={"https://github.com/digimuza/ts-prime"}>
            <img
              alt={"Github"}
              style={{
                width: "auto",
                height: "30px",
              }}
              src={`/github.svg`}
            ></img>
          </a>
        </div>
      )}
    </Header>
  );
});

export const Container = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <Layout
      className={`${props.className ?? ""}`}
      style={{ padding: "0 24px 24px" }}
    >
      <Content
        className={`content`}
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );
};
export const View = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <Layout
      className={`${props.className ?? ""} view`}
      style={{
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      {props.children}
    </Layout>
  );
};

export const PrimaryLayout = observer(
  (
    props: PropsWithChildren<{
      sideMenu: JSX.Element;
      readme: string;
    }>
  ) => {
    const theme = P.isOneOf(ThemeState.theme, ["dark", "light"])
      ? ThemeState.theme
      : "dark";

    return (
      <Router>
        <Layout className={`ts-prime-${theme}`}>
          <LayoutHeader></LayoutHeader>
          <Route {...paths.documentation}>
            <View>
              <Sider width={400} className="site-layout-background">
                {props.sideMenu}
              </Sider>
              <Container>{props.children}</Container>
            </View>
          </Route>
          <Route {...paths.home}>
            <View>
              <Container>
                <Card>
                  <Markdown markdown={props.readme} narrow={true}></Markdown>
                </Card>
              </Container>
            </View>
          </Route>
        </Layout>
      </Router>
    );
  }
);
