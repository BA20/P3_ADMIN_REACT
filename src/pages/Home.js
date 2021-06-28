import { Layout } from "antd";
import NavBar from "./components/NavBar";
import React from "react";
import TopBar from "./components/TopBar";
import background from "./components/images/background-login.jpg";
import { withRouter } from "react-router-dom";

//import Axios from "axios";

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function Home() {
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
              backgroundImage: `url(${background})`,
              backgroundColor: "#007BFF",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Home);
