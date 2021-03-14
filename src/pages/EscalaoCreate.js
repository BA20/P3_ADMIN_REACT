import React from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Form, Input, Button } from "antd";
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

function EscalaoCreate() {
  const [NameEs, setNameEs] = useState("");
  const [Descricao, setDescricao] = useState("");

  const [ResponseStatus, setResponseStatus] = useState(false);
  const [MensagemStatus, setMensagemStatus] = useState([]);

  const addEscalao = () => {
    if (NameEs.length <= 1) {
      setMensagemStatus("Campos Vazios!");
      setResponseStatus(false);
      //setAlert(true);
    }
    Axios.post(`http://${process.env.REACT_APP_API}/createEscalao`, {
      Descricao: Descricao,
      NameEs: NameEs,
    }).then((response) => {
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
            <Row>
              <Col span={8}>
                <Link to="/escalao">
                  <Button shape="circle" icon={<LeftOutlined />} />
                </Link>
              </Col>
              <Col span={8}>
                <h1>Criar Escalão</h1>
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
                    className="createEscalao"
                  >
                    <Form.Item
                      label="Nome"
                      name="NameEs"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setNameEs(e.target.value);
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Descricao"
                      name="Descricao"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setDescricao(e.target.value);
                        }}
                      />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button
                        type="primary"
                        onClick={addEscalao}
                        htmlType="submit"
                      >
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

export default withRouter(EscalaoCreate);
