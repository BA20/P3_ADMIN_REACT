import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "antd/dist/antd.css";
import logo from "./pages/components/images/logovcv.png";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ProtectedRoute from "./routes/ProtectedRoute";
import background from "./pages/components/images/background-login.jpg";
import Home from "./pages/Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Atletas from "./pages/Atletas";
import Treinadores from "./pages/Treinadores";
import Eventos from "./pages/Eventos";
import Avaliacao from "./pages/Avaliacao";
import Exercicios from "./pages/Exercicios";
import Outros from "./pages/Outros";
import Users from "./pages/Users";
import UsersCreate from "./pages/usersCreate";
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
              display: "grid",
            }}
          >
            <div
              className="login"
              style={{
                display: "grid",
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
                  display: "grid",
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
                        <Link to="/home" onClick={login} isAuth={isAuth}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              backgroundColor: "#001145",
                              borderColor: "#001145",
                            }}
                          >
                            Login
                          </Button>
                        </Link>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "-ms-flexbox",
                    paddingBlockEnd: "0px",
                  }}
                ></Row>
              </Container>
            </div>

            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {loginStatus}
            </Alert>
          </div>
        </Route>
        <Route path="/user">
          <Users />
        </Route>
        <Route path="/userCreate">
          <usersCreate />
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
        path="/users"
        component={Users}
        isAuth={isAuth}
      ></ProtectedRoute>
      <ProtectedRoute
        path="/usersCreate"
        component={UsersCreate}
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
