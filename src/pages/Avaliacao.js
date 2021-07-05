import { Button, Space, Table } from "antd";
import { Link, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Axios from "axios";
import { Layout } from "antd";
import NavBar from "./components/NavBar";
import { PlusCircleOutlined } from "@ant-design/icons";
import TopBar from "./components/TopBar";
import background from "./components/images/background-login.jpg";
import moment from "moment";

const { Column, ColumnGroup } = Table;

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function Avaliacao() {
  const [Avaliacao, setAvaliacao] = useState([]);
  const [ResponseStatus, setResponseStatus] = useState();
  const deleteAvaliacao = (id) => {
    Axios.post(`http://volleyapi.sarapaiva.webtuga.net/deleteavaliacao`, {
      id: id,
    }).then((response) => {
      console.log(response);
      setResponseStatus(`Eliminado o avaliação ${id}`);
    });
  };
  useEffect(() => {
    Axios.get(`http://volleyapi.sarapaiva.webtuga.net/avaliacao`).then(
      (response) => {
        let ava = response.data;
        ava.map((el) => {
          let date = moment.unix(new Date(el.date));
          el.date = date.format("DD/MM/YYYY");
        });

        setAvaliacao(ava);
      }
    );
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
                ></div>
                <Table dataSource={Avaliacao} size="small">
                  <ColumnGroup
                    title="ID"
                    dataIndex="idAthlete_Evaluation"
                    key="idAthlete_Evaluation"
                    rowSpan="5"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Nome Atleta"
                    dataIndex="NameAtl"
                    key="NameAtl"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Score"
                    dataIndex="Score"
                    key="Score"
                  ></ColumnGroup>
                  <ColumnGroup
                    title="Data"
                    dataIndex="date"
                    key="date"
                  ></ColumnGroup>

                  <Column
                    title=""
                    key="action"
                    fixed="right"
                    render={(text, record) => (
                      <Space size="middle">
                        <Button
                          onClick={() => {
                            deleteAvaliacao(record.idAthlete_Evaluation);
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

export default withRouter(Avaliacao);
