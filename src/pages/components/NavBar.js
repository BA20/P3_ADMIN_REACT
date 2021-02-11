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
    <Menu style={{ width: 256, minHeight: "100vh" }} mode="inline">
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/users">Pais</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<BarsOutlined />} title="Atletas">
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/atletas"> Atletas</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/teams">Equipas</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/escalao">Escalão</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="4" icon={<TeamOutlined />}>
        <Link to="/treinadores">Treinadores</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<CalendarOutlined />}>
        <Link to="/eventos"> Eventos</Link>
      </Menu.Item>

      <Menu.Item key="6" icon={<StockOutlined />}>
        <Link to="/avaliacao">Avaliação</Link>
      </Menu.Item>
      <SubMenu key="sub2" icon={<BarsOutlined />} title="Exercícios">
        <Menu.Item key="7" icon={<BarsOutlined />}>
          <Link to="/exercicios">Exercícios</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<BarsOutlined />}>
          <Link to="/sets">Sets de Exercícios</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<PlusCircleOutlined />} title="Outros">
        <Link to="/outros">Outros</Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(NavBar);
