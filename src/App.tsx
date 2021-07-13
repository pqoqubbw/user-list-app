import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainPage } from './components/MainPage';
import { UserInfo } from './components/UserInfo';

export interface IUserListData {
  firstname: string;
  lastname: string;
  initials: string;
  date: string;
  email: string;
  horoskop: string;
  bloodType: string;
  avatarColor: string;
}

const App: React.FC = () => {
  const [userList, setUserList] = useState<Array<IUserListData>>([]);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainPage userList={userList} setUserList={setUserList} />
        </Route>
        <Route path="/:email" exact>
          <UserInfo userList={userList} setUserList={setUserList} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
