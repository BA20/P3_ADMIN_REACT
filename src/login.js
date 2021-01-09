import React, { useState } from "react";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "antd/dist/antd.css";
import logo from "./pages/components/images/logovcv.png";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

require("dotenv").config();

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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const login = () => {
    if (password.length <= 1) {
      setLoginStatus("Campos Vazios!");
      setAlert(true);
    }
    if (username.length <= 1) {
      setLoginStatus("Campos Vazios!");
      setAlert(true);
    } else {
      Axios.post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/login`,
        {
          //Axios.post(`http://localhost:5050/login`, {
          username: username,
          password: password,
        }
      ).then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
          setAlert(true);
        } else {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          setLoginStatus(true);
        }
      });
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Alert
          variant="danger"
          onClose={() => setAlert(false)}
          dismissible
          show={alert}
        >
          <Alert.Heading>{loginStatus}</Alert.Heading>
        </Alert>
      </div>
      <div
        className="login"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "0px",
          margin: "auto",
          width: "50%",
          backgroundColor: "rgba(255,255,255, 0.9)",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col>
              <Image
                src={logo}
                roundedCircle
                style={{
                  padding: "20px",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col className="login">
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                className="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                  paddingTop: "30%",
                }}
              >
                <Form.Item
                  prefix={<UserOutlined />}
                  label="Username "
                  name="username"
                >
                  <Input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#001145",
                      borderColor: "#001145",
                    }}
                    onClick={login}
                    href="/home"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
