import * as React from "react";
import useState from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
import Axios from "axios";

import { DataGrid } from "@material-ui/data-grid";
//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

const data = () => {
  Axios.get(
    `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users`
  ).then((response) => {
    console.log(response.data);
  });
};

function Users() {
  // const [UsersList, setUsersList] = useState([]);

  const columns = [
    { field: "idUser", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Nome", width: 130 },
    { field: "Email", headerName: "Email", width: 130 },
    { field: "PhoneNumber", headerName: "Nº Tlm", width: 130 },
    { field: "Tipo", headerName: "Tipo", width: 130 },
  ];

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
                paddingLeft: "100px",
                paddingTop: "20px",
                paddingBlockEnd: "10px",
                height: "70%",
                width: "100%",
              }}
            >
              <DataGrid rows={data} columns={columns} pageSize={10} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Users);
