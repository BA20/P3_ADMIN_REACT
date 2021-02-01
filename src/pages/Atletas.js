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

function Atletas() {
  const [AtletasList, setAtletasList] = useState([]);
  const [ResponseStatus, setResponseStatus] = useState();

  const updateUser = (id) => {
    Axios.put(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
      {
        id: id,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Editado Atleta ${id}`);
    });
  };

  const deleteAtleta = (id) => {
    Axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/deleteAtleta`,
      {
        id: id,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Eliminado Atleta ${id}`);
    });
  };
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/atletas`
    ).then((response) => {
      setAtletasList(response.data);
      console.log(response.data);
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
                  <Link to="/AtletasCreate">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<PlusCircleOutlined />}
                      size={"large"}
                    />
                  </Link>
                </div>
                <Table dataSource={AtletasList} size="small">
                  <ColumnGroup
                    title="idAthlete"
                    dataIndex="idAthlete"
                    key="idAthlete"
                    rowSpan="5"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Nome"
                    dataIndex="NameAtl"
                    key="NameAtl"
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
                  <ColumnGroup
                    title="Enc.Educação"
                    dataIndex="Name"
                    key="Name"
                  ></ColumnGroup>

                  <ColumnGroup
                    title="Altura"
                    dataIndex="Height"
                    key="Height"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Peso"
                    dataIndex="Weight"
                    key="Weight"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Largura"
                    dataIndex="ArmSpan"
                    key="ArmSpan"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Data de Nascimento"
                    dataIndex="BirthDate"
                    key="BirthDate"
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
                            deleteAtleta(record.idAthlete);
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

export default withRouter(Atletas);
