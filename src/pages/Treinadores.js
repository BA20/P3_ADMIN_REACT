import React from "react";
import { withRouter } from "react-router-dom";
<<<<<<< HEAD
=======
import { Table } from "rsuite";
import { IconButton } from "rsuite";
import { Icon } from "rsuite";
>>>>>>> parent of a03a502... 1
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
<<<<<<< HEAD
//import Axios from "axios";

import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];
=======
import Axios from "axios";
const { Header, Sider, Content } = Layout; //antd
const { Column, HeaderCell, Cell } = Table; //rsuite

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
  return (
    <Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={handleAction}
        icon={<Icon icon="edit2" />}
      />
    </Cell>
  );
};

function Treinadores() {
  const [AtletaList, setAtletaList] = useState([]);
>>>>>>> parent of a03a502... 1

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

function Treinadores() {
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
              paddingLeft: "240px",
            }}
          >
<<<<<<< HEAD
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                backgroundColor="#001145"
              />
=======
            <div>
              <Table data={AtletaList} height={400}>
                <Column width={100} align="center" fixed resizable>
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>
                <Column width={150} align="center" fixed resizable>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstName" />
                </Column>
                <Column width={150} align="center" fixed resizable>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastName" />
                </Column>
                <Column width={200} align="center" sortable fixed resizable>
                  <HeaderCell>City</HeaderCell>
                  <Cell dataKey="city" />
                </Column>
                <Column
                  width={300}
                  align="center"
                  sortable={true}
                  fixed
                  resizable
                >
                  <HeaderCell>Street</HeaderCell>
                  <Cell dataKey="street" />
                </Column>
                <Column width={300} align="center" fixed resizable>
                  <HeaderCell>Company Name</HeaderCell>
                  <Cell dataKey="companyName" />
                </Column>
                <Column width={200} align="center" fixed resizable>
                  <HeaderCell>Email</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
                <Column width={120} fixed="right">
                  <HeaderCell>Action</HeaderCell>
                  <Cell>
                    {(rowData) => {
                      function handleAction() {
                        alert(`id:${rowData.id}`);
                      }
                      return (
                        <span>
                          <a onClick={handleAction}>
                            {" "}
                            <b>Edit</b>{" "}
                          </a>{" "}
                          |
                          <a onClick={handleAction}>
                            {" "}
                            <b>Remove</b>{" "}
                          </a>
                        </span>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
>>>>>>> parent of a03a502... 1
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default withRouter(Treinadores);
