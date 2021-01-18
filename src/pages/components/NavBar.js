import React from "react";
import { withRouter } from "react-router-dom";

import { Menu } from "antd";
import {
  ControlOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  StockOutlined,
  BarsOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
//  import jwt from "jwt-decode";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const { SubMenu } = Menu;

function NavBar() {
  return (
    <Menu
      style={{ width: 256, minHeight: "100vh" }}
      defaultSelectedKeys={["sub1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<ControlOutlined />} title="Admin">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/users">users</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/atletas">Atletas</Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="/treinadores">Treinadores</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          <Link to="/eventos"> Eventos</Link>
        </Menu.Item>

        <Menu.Item key="5" icon={<StockOutlined />}>
          <Link to="/avaliacao">Avaliação</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<BarsOutlined />}>
          <Link to="/exercicios">Exercícios</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<PlusCircleOutlined />} title="Outros">
          <Link to="/outros">Outros</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default withRouter(NavBar);
