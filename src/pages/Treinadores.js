import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table, Space, Button } from "antd";

const { Column, ColumnGroup } = Table;

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function Treinadores() {
  const [UserList, setUserList] = useState([]);
  const [ResponseStatus, setResponseStatus] = useState();

  const updateUser = (id) => {
    Axios.put(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
      {
        id: id,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Editado o User ${id}`);
    });
  };

  const deleteUser = (id) => {
    Axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/deleteUser`,
      {
        id: id,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Eliminado o User ${id}`);
    });
  };
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/usersTreinador`
    ).then((response) => {
      setUserList(response.data);
    });
  }, [ResponseStatus]);
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
                display: "flex",
              }}
            >
              <div
                style={{
                  paddingLeft: "100px",
                  paddingTop: "20px",
                  paddingBlockEnd: "10px",
                  height: "60%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingRight: 0,
                  }}
                >
                  <Link to="/TreinadorCreate">
                    <Button
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      size={"large"}
                    >
                      Criar Treinador
                    </Button>
                  </Link>
                </div>
                <Table dataSource={UserList} size="small">
                  <ColumnGroup
                    title="idUser"
                    dataIndex="idUser"
                    key="idUser"
                    rowSpan="5"
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
                    fixed="right"
                    render={(text, record) => (
                      <Space size="middle">
                        <Button>Editar</Button>
                        <Button
                          onClick={() => {
                            deleteUser(record.idUser);
                          }}
                        >
                          Eliminar
                        </Button>
                      </Space>
                    )}
                  />
                </Table>
                <h1>{ResponseStatus}</h1>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Treinadores);
