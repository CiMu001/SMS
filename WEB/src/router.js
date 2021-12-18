import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MyLayout from './components/BLayout/MyLayout';
import HomePage from './routes/HomePage';
import AdminPage from './routes/AdminPage';
import StudentsPage from './routes/StudentsPage';
import FloorPage from './routes/FloorPage';
import AttendancePage from './routes/AttendancePage';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Login" component={LoginPage} />
          <MyLayout>
            <Route path="/" exact component={HomePage} />
            <Route path="/Admin" exact component={AdminPage} />
            <Route path="/Student" exact component={StudentsPage} />
            <Route path="/Floor" exact component={FloorPage} />
            <Route path="/Attendance" exact component={AttendancePage} />
          </MyLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
