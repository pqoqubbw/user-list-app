import React, { useEffect, useState } from 'react';
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
import { UpdateFormComponent } from './UpdateFormComponent';

export const UserInfo: React.FC<IUserForm> = ({ userList, setUserList }: IUserForm) => {
  // eslint-disable-next-line no-unused-vars
  const [isUpdating, setIsUpdating] = useState(true);
  const history = useHistory();
  const currentUserURL = history.location.pathname.slice(1);

  const findCurrentUser = () => userList.filter((user) => user.email === currentUserURL);

  const deleteUser = () => {
    const newUserList: IUserListData[] = userList.filter((user) => user.email !== currentUserURL);
    setUserList(newUserList);

    history.push('/');
  };

  useEffect(() => {
    if (!findCurrentUser().length) history.push('/');
  }, []);

  const updateUser = () => {
    const currentUser = findCurrentUser();
    console.log(currentUser);
  };

  return (
    <Container>
      {isUpdating ? (
        <UpdateFormComponent
          userList={userList}
          setUserList={setUserList}
          currentUser={findCurrentUser()}
        />
      ) : (
        <UserForm userList={userList} setUserList={setUserList} />
      )}
      <Link to="/">
        <Button size="small">Return To User List</Button>
      </Link>
      {findCurrentUser().map((user) => (
        <Card key={user.email}>
          <CardContent>
            <Avatar
              alt={user.initials}
              style={{ backgroundColor: user.avatarColor, width: '40px', height: '40px' }}
            >
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
            <Button onClick={updateUser}>update</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};
