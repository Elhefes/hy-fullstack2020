import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";
import PatientList from "./PatientList";

import PatientListPage from "./PatientListPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    const getPatients = async () => {
      const { data: list } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      console.log(list)
      dispatch(setPatientList(list));
    };
    getPatients();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
          <Route path="/patients/:id" render={() => <PatientList/>} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
