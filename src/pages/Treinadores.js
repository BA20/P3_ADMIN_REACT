import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Table } from "rsuite";

import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";
import "rsuite/lib/styles/index.less";
const { Header, Sider, Content } = Layout; //antd
const { Column, HeaderCell, Cell } = Table; //rsuite

function Treinadores() {
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
            <div>
              <Table
                height={400}
                data={AtletaList}
                onRowClick={(data) => {
                  console.log(data);
                }}
              >
                <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={200} fixed>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstName" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastName" />
                </Column>

                <Column width={200}>
                  <HeaderCell>City</HeaderCell>
                  <Cell dataKey="city" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Street</HeaderCell>
                  <Cell dataKey="street" />
                </Column>

                <Column width={300}>
                  <HeaderCell>Company Name</HeaderCell>
                  <Cell dataKey="companyName" />
                </Column>

                <Column width={300}>
                  <HeaderCell>Email</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
                <Column width={120} fixed="right">
                  <HeaderCell>Action</HeaderCell>

                  <Cell>
                    {(rowData) => {
                      function handleAction() {
                        alert(`id:${rowData.id}`);
                      }
                      return (
                        <span>
                          <a href="/home" onClick={handleAction}>
                            Edit
                          </a>
                          |
                          <a href="/home" onClick={handleAction}>
                            Remove
                          </a>
                        </span>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Treinadores);
