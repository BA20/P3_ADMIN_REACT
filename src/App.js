import "./App.css";
import { useState } from "react";
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

import ProtectedRoute from "./routes/ProtectedRoute";
import background from "./pages/components/images/background-login.jpg";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Atletas from "./pages/Atletas";
import Treinadores from "./pages/Treinadores";
import Eventos from "./pages/Eventos";
import Avaliacao from "./pages/Avaliacao";
import Exercicios from "./pages/Exercicios";
import Outros from "./pages/Outros";
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

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [isAuth, setisAuth] = useState(false);
  Axios.defaults.withCredentials = true;

  if (localStorage.getItem("token") !== null) {
    console.log("Autenticado");
    setisAuth(true);
  }

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
          setLoginStatus(response.data.message);
          setAlert(true);
        } else {
          console.log(response.data.message);
          localStorage.setItem("token", response.data.token);
          setLoginStatus(true);
          setisAuth(true);
        }
      });
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
            {isAuth ? (
              <Redirect path="/home" />
            ) : (
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
                            >
                              <Link to="/home" isAuth={isAuth}>
                                Login
                              </Link>
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </>
            )}
          </div>
        </Route>
        <Route path="/atletas">
          <Atletas />
        </Route>
        <Route path="/treinadores">
          <Treinadores />
        </Route>
        <Route path="/eventos">
          <Eventos />
        </Route>
        <Route path="/avaliacao">
          <Avaliacao />
        </Route>
        <Route path="/exercicios">
          <Exercicios />
        </Route>
        <Route path="/outros">
          <Outros />
        </Route>
      </Switch>

      <ProtectedRoute
        path="/home"
        component={Home}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/atletas"
        component={Atletas}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/treinadores"
        component={Treinadores}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/eventos"
        component={Eventos}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/avaliacao"
        component={Avaliacao}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/exercicios"
        component={Exercicios}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/outros"
        component={Outros}
        isAuth={isAuth}
      ></ProtectedRoute>
    </Router>
  );
}
