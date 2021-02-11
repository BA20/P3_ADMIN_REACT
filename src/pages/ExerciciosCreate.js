import React from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import Axios from "axios";

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function ExerciciosCreate() {
  const [Descrição, setDescrição] = useState("");
  const [Name, setName] = useState("");
  const [ObjectivoEsp, setObjectivoEsp] = useState("");
  const [Duration, setDuration] = useState("");
  const [Esquema_link, setEsquema_link] = useState("");
  const [ResponseStatus, setResponseStatus] = useState(false);
  const [MensagemStatus, setMensagemStatus] = useState([]);

  const addExe = () => {
    if (
      Descrição.length <= 1 ||
      Name.length <= 1 ||
      Esquema_link.length <= 1 ||
      ObjectivoEsp.length <= 1 ||
      Duration.length <= 1
    ) {
      setMensagemStatus("Campos Vazios!");
      setResponseStatus(false);
      //setAlert(true);
    }
    Axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/createExercise`,
      {
        Descrição: Descrição,
        Name: Name,
        ObjectivoEsp: ObjectivoEsp,
        Duration: Duration,
        Esquema_link: Esquema_link,
      }
    ).then((response) => {
      if (!response.data.ResponseStatus) {
        console.log(response.data);
        setMensagemStatus(response.data.mensagemStatus);
        setResponseStatus(false);
      } else {
        setResponseStatus(true);
        setMensagemStatus(response.data.mensagemStatus);
        console.log(response.data.mensagemStatus);
        console.log(MensagemStatus);
      }
    });
  };

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
            paddingTop: 74,
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
              backgroundColor: "#FFFFFF",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              paddingTop: 54,
            }}
          >
            {" "}
            <Row>
              <Col span={8}>
                {" "}
                <Link to="/exercicios">
                  {" "}
                  <Button shape="circle" icon={<LeftOutlined />} />
                </Link>
              </Col>
              <Col span={8}>
                <h1>Criar Exercicio</h1>
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row>
              <Col span={8}></Col>
              <Col span={8}>
                {" "}
                <div>
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    className="createExercise"
                  >
                    <Form.Item
                      label="Nome"
                      name="Name"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Nome"
                      name="name"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Descrição"
                      name="Descrição"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setDescrição(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="ObjectivoEsp"
                      name="ObjectivoEsp"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setObjectivoEsp(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Duration"
                      name="Duration"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setDuration(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Esquema_link"
                      name="Esquema_link"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setEsquema_link(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" onClick={addExe} htmlType="submit">
                        Criar
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
            <h1>{ResponseStatus}</h1>
            <h1>{MensagemStatus}</h1>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(ExerciciosCreate);