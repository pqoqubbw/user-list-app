import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';

import { IUserListData } from '../App';
import { IUserForm, UserForm } from './UserForm';

export const UserInfo: React.FC<IUserForm> = ({ userList, setUserList }: IUserForm) => {
  const history = useHistory();
  const currentUserURL = history.location.pathname.slice(1);

  const findCurrentUser = () => userList.filter((user) => user.id === +currentUserURL);

  const deleteUser = () => {
    const newUserList: IUserListData[] = userList.filter((user) => user.id !== +currentUserURL);
    setUserList(newUserList);

    history.push('/');
  };

  useEffect(() => {
    if (!findCurrentUser().length) history.push('/');
  }, []);

  return (
    <Container>
      <UserForm userList={userList} setUserList={setUserList} />
      <Link to="/">
        <Button size="small">Return To User List</Button>
      </Link>
      {findCurrentUser().map((user) => (
        <Card key={user.email}>
          <CardContent>
            <Avatar alt={user.initials} style={{ backgroundColor: user.avatarColor }}>
              {user.initials}
            </Avatar>
            <Typography component="p">email: {user.email}</Typography>
            <Typography component="p">date: {user.date ? user.date : 'N/A'}</Typography>
            <Typography component="p">horoskop: {user.horoskop ? user.horoskop : 'N/A'}</Typography>
            <Typography component="p">
              bloodType: {user.bloodType ? user.bloodType : 'N/A'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={deleteUser}>delete</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};
