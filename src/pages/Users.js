import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";
import { Table, Space } from "antd";
const { Column, ColumnGroup } = Table;

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function Users() {
  const [UserList, setUserList] = useState([]);

  Axios.get(
    `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users`
  ).then((response) => {
    setUserList(response.data);
  });
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundColor: "#007BFF",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        margin: "auto",
        display: "flex",
        direction: "column",
      }}
    >
      <Layout
        style={{
          display: "-moz-initial  ",
        }}
      >
        <Sider
          style={{
            backgroundColor: "#001145",
            paddingTop: "74px",
            width: 256,
          }}
        >
          <NavBar></NavBar>
        </Sider>
        <Layout>
          <Header>
            <TopBar />
          </Header>
          <Content
            style={{
              backgroundColor: "#FFFFSFF",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              style={{
                paddingLeft: "100px",
                paddingTop: "20px",
                paddingBlockEnd: "10px",
                height: "70%",
                width: "100%",
              }}
            >
              <Table dataSource={UserList}>
                <ColumnGroup
                  title="idUser"
                  dataIndex="idUser"
                  key="idUser"
                ></ColumnGroup>
                <ColumnGroup
                  title="Nome"
                  dataIndex="Name"
                  key="Name"
                ></ColumnGroup>
                <ColumnGroup
                  title="Email"
                  dataIndex="Email"
                  key="Email"
                ></ColumnGroup>
                <ColumnGroup
                  title="Telemóvel"
                  dataIndex="PhoneNumber"
                  key="PhoneNumber"
                ></ColumnGroup>

                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a href="/">Editar </a>
                      <a href="/">Eliminar</a>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Users);
