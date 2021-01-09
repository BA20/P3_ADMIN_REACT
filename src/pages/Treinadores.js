import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Table } from "rsuite";
import { IconButton } from "rsuite";
import { Icon } from "rsuite";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";
const { Header, Sider, Content } = Layout; //antd
const { Column, HeaderCell, Cell } = Table; //rsuite

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
  return (
    <Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={handleAction}
        icon={<Icon icon="edit2" />}
      />
    </Cell>
  );
};

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
              <Table data={AtletaList} height={400}>
                <Column width={100} align="center" fixed resizable>
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>
                <Column width={150} align="center" fixed resizable>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstName" />
                </Column>
                <Column width={150} align="center" fixed resizable>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastName" />
                </Column>
                <Column width={200} align="center" sortable fixed resizable>
                  <HeaderCell>City</HeaderCell>
                  <Cell dataKey="city" />
                </Column>
                <Column
                  width={300}
                  align="center"
                  sortable={true}
                  fixed
                  resizable
                >
                  <HeaderCell>Street</HeaderCell>
                  <Cell dataKey="street" />
                </Column>
                <Column width={300} align="center" fixed resizable>
                  <HeaderCell>Company Name</HeaderCell>
                  <Cell dataKey="companyName" />
                </Column>
                <Column width={200} align="center" fixed resizable>
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
                          <a onClick={handleAction}>
                            {" "}
                            <b>Edit</b>{" "}
                          </a>{" "}
                          |
                          <a onClick={handleAction}>
                            {" "}
                            <b>Remove</b>{" "}
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
