import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";

//  import jwt from "jwt-decode";
import { Typography } from "antd";

import Table from "react-bootstrap/Table";
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

function Atletas() {
  const [AtletaList, setAtletaList] = useState([]);

  Axios.get(
    `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/atletas`
  ).then((response) => {
    setAtletaList(response.data);
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
            width: "100px",
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
              backgroundImage: `url(${background})`,
              backgroundColor: "#007BFF",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              paddingLeft: "100px",
              paddingTop: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255, 0.9)",
              }}
            >
              <Title level={2}>Atletas</Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Tlm</th>
                    <th>Email</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>Largura</th>
                    <th>Data de Nascimento</th>
                  </tr>
                </thead>
                <tbody>
                  {AtletaList.map((val, key) => {
                    return (
                      <tr className="Atleta">
                        <td>{val.idAthlete}</td>
                        <td>{val.Name}</td>
                        <td>{val.PhoneNumber}</td>
                        <td>{val.Email}</td>
                        <td>{val.Height}</td>
                        <td>{val.Weight}</td>
                        <td>{val.ArmSpan}</td>
                        <td>{val.BirthDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Atletas);
