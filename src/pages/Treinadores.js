import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import background from "./components/images/background-login.jpg";
//import Axios from "axios";
import "./index.css";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

//  import jwt from "jwt-decode";
const { Header, Sider, Content } = Layout;

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    title: "Create an example",
    description: "Create an example of how to use the component",
  },
  {
    id: 2,
    title: "Improve",
    description: "Improve the component!",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    task.title = data.title;
    task.description = data.description;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    tasks = tasks.filter((t) => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

function Treinadores() {
  const [AtletaList, setAtletaList] = useState([]);
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
          >
            <div style={styles.container}>
              <CRUDTable
                caption="Atletas"
                fetchItems={(payload) => service.fetchItems(payload)}
              >
                <Fields>
                  <Field
                    name="idAthlete"
                    label="Id"
                    hideInCreateForm
                    readOnly
                  />
                  <Field name="Name" label="Nome" placeholder="Name" />
                  <Field name="PhoneNumber" label="Tlm" placeholder="Tlm" />
                  <Field name="Email" label="Email" placeholder="Email" />
                  <Field name="Height" label="Altura" placeholder="Altura" />
                  <Field name="Weight" label="Peso" placeholder="Peso" />
                  <Field name="ArmSpan" label="Largura" placeholder="Largura" />
                  <Field
                    name="BirthDate  "
                    label="Data de Nascimento"
                    placeholder="Data de Nascimento"
                  />
                </Fields>
                <CreateForm
                  title="Task Creation"
                  message="Create a new task!"
                  trigger="Create Task"
                  onSubmit={(task) => service.create(task)}
                  submitText="Create"
                  validate={(values) => {
                    const errors = {};
                    if (!values.title) {
                      errors.title = "Please, provide task's title";
                    }

                    if (!values.description) {
                      errors.description = "Please, provide task's description";
                    }

                    return errors;
                  }}
                />

                <UpdateForm
                  title="Task Update Process"
                  message="Update task"
                  trigger="Update"
                  onSubmit={(task) => service.update(task)}
                  submitText="Update"
                  validate={(values) => {
                    const errors = {};

                    if (!values.id) {
                      errors.id = "Please, provide id";
                    }

                    if (!values.title) {
                      errors.title = "Please, provide task's title";
                    }

                    if (!values.description) {
                      errors.description = "Please, provide task's description";
                    }

                    return errors;
                  }}
                />

                <DeleteForm
                  title="Task Delete Process"
                  message="Are you sure you want to delete the task?"
                  trigger="Delete"
                  onSubmit={(task) => service.delete(task)}
                  submitText="Delete"
                  validate={(values) => {
                    const errors = {};
                    if (!values.id) {
                      errors.id = "Please, provide id";
                    }
                    return errors;
                  }}
                />
              </CRUDTable>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Treinadores);
