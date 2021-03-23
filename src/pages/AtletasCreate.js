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

function AtletasCreate() {
  const [nameAtl, setnameAtl] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [ArmSpan, setArmSpan] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [idUser, setidUser] = useState("");
  const [idTeam, setidTeam] = useState("");
  const [options, setoptions] = useState([]);
  const [optionsT, setoptionsT] = useState([]);

  const [ResponseStatus, setResponseStatus] = useState(false);
  const [MensagemStatus, setMensagemStatus] = useState([]);
  useEffect(() => {
    Axios.get(`http://volleyapi.sarapaiva.webtuga.net/getidpai`).then(
      (response) => {
        console.log(response.data);
        setoptions(response.data);
      }
    );
    Axios.get(`http://volleyapi.sarapaiva.webtuga.net/getidteams`).then(
      (response) => {
        console.log(response.data);
        setoptionsT(response.data);
      }
    );
  }, []);

  const addAtleta = () => {
    if (nameAtl.length <= 1 || idUser.length <= 0) {
      setMensagemStatus("Campos Vazios!");
      setResponseStatus(false);
      //setAlert(true);
    }
    Axios.post(`http://volleyapi.sarapaiva.webtuga.net/createatleta`, {
      nameAtl: nameAtl,
      Height: Height,
      Weight: Weight,
      ArmSpan: ArmSpan,
      BirthDate: BirthDate,
      idUser: idUser,
      idTeam: idTeam,
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
                <Link to="/atletas">
                  {" "}
                  <Button shape="circle" icon={<LeftOutlined />} />
                </Link>
              </Col>
              <Col span={8}>
                <h1>Criar Atleta</h1>
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
                    className="createUser"
                  >
                    <Form.Item
                      label="Nome"
                      name="Name"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setnameAtl(e.target.value);
                          console.log(nameAtl);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Altura"
                      name="Height"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setHeight(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Peso"
                      name="Weight"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setWeight(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Largura"
                      name="ArmSpan"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Input
                        onChange={(e) => {
                          setArmSpan(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Enc.Educação"
                      name="idUser"
                      {...tailLayout}
                    >
                      <Cascader
                        label="Enc.Educação"
                        options={options}
                        defaultValue={0}
                        onChange={(value, selectedOptions) => {
                          setidUser(value);
                          console.log(value, selectedOptions);
                          setidUser(value);
                        }}
                        placeholder="Enc."
                      />
                      <Link to="/usersCreate">
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          size={"small"}
                        ></Button>
                      </Link>
                    </Form.Item>
                    <Form.Item
                      label="Equipa"
                      name="idteam"
                      rules={[{ required: true }]}
                      {...tailLayout}
                    >
                      <Cascader
                        label="Equipa"
                        options={optionsT}
                        defaultValue={0}
                        onChange={(value, selectedOptions) => {
                          setidTeam(value);
                          console.log(selectedOptions);
                        }}
                        placeholder="Equipa"
                      />
                      <Link to="/teamsCreate">
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          size={"small"}
                        ></Button>
                      </Link>
                    </Form.Item>
                    <Form.Item
                      label="Data de Nasc.:"
                      name="BirthDate"
                      {...tailLayout}
                    >
                      <DatePicker
                        placeholder="data"
                        format={"YYYY/MM/DD"}
                        onChange={(value) => {
                          console.log(moment(value).format("YYYY-MM-DD"));
                          setBirthDate(moment(value).format("YYYY-MM-DD"));
                        }}
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button
                        type="primary"
                        onClick={addAtleta}
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

export default withRouter(AtletasCreate);
