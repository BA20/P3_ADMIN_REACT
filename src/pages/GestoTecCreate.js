import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import { LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import Axios from "axios";
import { Cascader } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";

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

function GestoTecCreate() {
  const [nomeGT, setnomeGT] = useState("");
  const [Descrição, setDescrição] = useState("");

  const [ResponseStatus, setResponseStatus] = useState(false);
  const [MensagemStatus, setMensagemStatus] = useState([]);

  const addGT = () => {
    if (nomeGT.length <= 1) {
      setMensagemStatus("Campos Vazios!");
      setResponseStatus(false);
    }
    Axios.post(`http://${process.env.REACT_APP_API}/createGestoTecnico`, {
      NomeGesto: nomeGT,
      Descrição: Descrição,
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
            {" "}
            <Row>
              <Col span={8}>
                {" "}
                <Link to="/gestotec">
                  {" "}
                  <Button shape="circle" icon={<LeftOutlined />} />
                </Link>
              </Col>
              <Col span={8}>
                <h1>Criar Gesto Técnico</h1>
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
                    className="createGT"
                  >
                    <Form.Item
                      label="Nome"
                      name="nomeGT"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setnomeGT(e.target.value);
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

                    <Form.Item {...tailLayout}>
                      <Button type="primary" onClick={addGT} htmlType="submit">
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

export default withRouter(GestoTecCreate);
