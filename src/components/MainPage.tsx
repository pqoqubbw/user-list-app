import React from 'react';
import { Grid } from '@material-ui/core';

import { UserList } from './UserList';
import { IUserForm, UserForm } from './UserForm';

export const MainPage: React.FC<IUserForm> = ({ userList, setUserList }: IUserForm) => {
  return (
    <Grid container>
      <UserForm userList={userList} setUserList={setUserList} />
      <UserList items={userList} />
    </Grid>
  );
};
