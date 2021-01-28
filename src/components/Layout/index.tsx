import { Breadcrumb, Card, Input, Layout, Menu, Tooltip } from "antd";
import React, { PropsWithChildren } from "react";
import "antd/dist/antd.css";
import "./Layout.css";
const { Header, Content, Sider } = Layout;
import Scrollbar from "smooth-scrollbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import * as P from "ts-prime";
import { Markdown } from "../Documentation/Makrdown";

const paths = {
  home: { key: 1, path: "/home", title: "Home" },
  documentation: { key: 2, path: "/documentation", title: "Documentation" },
};
const LayoutHeader = () => {
  const route = useRouteMatch();
  const selected = [
    Object.values(paths)
      .find((q) => q.path === route.path)
      ?.key.toString(),
  ].filter(P.isDefined);
  return (
    <Header className="header">
      <Link to={'/home'}>
        <div className={"logo"}>
          <img
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
      <div>
        <Tooltip title={"Github"}>
          <a href={"https://github.com/digimuza/ts-prime"}>
            <img
              style={{
                width: "auto",
                height: "30px",
              }}
              src={"/github.svg"}
            ></img>
          </a>
        </Tooltip>
      </div>
    </Header>
  );
};

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

export const PrimaryLayout = (
  props: PropsWithChildren<{
    sideMenu: JSX.Element;
    readme: string;
  }>
) => {
  return (
    <Router>
      <Layout>
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
        <Route path={"/"}>
          <Redirect to={paths.home.path}></Redirect>
        </Route>
      </Layout>
    </Router>
  );
};
