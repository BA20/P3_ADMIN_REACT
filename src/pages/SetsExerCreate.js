import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Cascader } from "antd";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";
import { PlusCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { Form, Space } from "antd";
import { Row, Col } from "antd";

const { Column, ColumnGroup } = Table;

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function SetsExerCreate() {
  const [sets, setsets] = useState([]);
  const [ResponseStatus, setResponseStatus] = useState();
  const [exe, setexe] = useState([]);
  const [id_set, setid_set] = useState("");
  const [id_exe, setid_exe] = useState("");
  const [ExeSetExercise, setExeSetExercise] = useState("");

  const addSet_exe = () => {
    console.log(id_exe + " exe");
    console.log(id_set + " set");
    Axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/createExeSetExercise`,
      {
        id_set: id_set,
        id_exe: id_exe,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Add o Exercicio ${id_exe} ao Set ${id_set}`);
    });
  };

  const deleteSet = (id) => {
    Axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/deleteExeSetExercise`,
      {
        id: id,
      }
    ).then((response) => {
      console.log(response);
      setResponseStatus(`Eliminada a Relação  Exercicio Set :${id}`);
    });
  };
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/getidset`
    ).then((response) => {
      setsets(response.data);
    });
  }, [ResponseStatus]);
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/getidexe`
    ).then((response) => {
      setexe(response.data);
    });
  }, [ResponseStatus]);
  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/getExeSetExercise`
    ).then((response) => {
      setExeSetExercise(response.data);
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
                  <Link to="/sets">
                    <Button shape="circle" icon={<LeftOutlined />} />
                  </Link>
                </div>
                <Row>
                  <Col span={12} offset={6}>
                    <h1> Adicionar Exercícios a Set</h1>
                  </Col>{" "}
                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <Cascader
                      label="Set"
                      options={sets}
                      defaultValue={0}
                      onChange={(value, selectedOptions) => {
                        setid_set(value);
                        console.log(value, selectedOptions);
                      }}
                      placeholder="Set."
                    />

                    <Link to="/SetsCreate">
                      <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size={"small"}
                      ></Button>
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col span={12} offset={6}>
                    <Cascader
                      label="Exercícios"
                      options={exe}
                      defaultValue={0}
                      onChange={(value, selectedOptions) => {
                        setid_exe(value);
                        console.log(value, selectedOptions);
                      }}
                      placeholder="Exercícios."
                    />
                    <Link to="/exerciciosCreate">
                      <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size={"small"}
                      ></Button>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <Button type="primary" onClick={addSet_exe}>
                      Criar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <Table dataSource={ExeSetExercise} size="small">
                      <ColumnGroup
                        title="ID"
                        dataIndex="idEx_SetEx"
                        key="idEx_SetEx"
                        rowSpan="5"
                      ></ColumnGroup>
                      <ColumnGroup
                        title="Set"
                        dataIndex="NameSet"
                        key="NameSet"
                      ></ColumnGroup>
                      <ColumnGroup
                        title="Exercício"
                        dataIndex="Name"
                        key="Name"
                      ></ColumnGroup>

                      <Column
                        title="Action"
                        key="action"
                        fixed="right"
                        render={(text, record) => (
                          <Space size="middle">
                            <Button
                              onClick={() => {
                                deleteSet(record.idEx_SetEx);
                              }}
                            >
                              Eliminar
                            </Button>
                          </Space>
                        )}
                      />
                    </Table>
                  </Col>
                </Row>
                <h1>{ResponseStatus}</h1>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(SetsExerCreate);