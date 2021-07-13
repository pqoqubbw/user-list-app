import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { UserItem } from './UserItem';
import { IUserListData } from '../App';

const useStyles = makeStyles(() => ({
  gridContainer: {
    margin: '20px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface IUserList {
  items: Array<IUserListData>;
}

export const UserList: React.FC<IUserList> = ({ items }: IUserList) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer} spacing={3}>
      {items.length ? (
        items.map((item) => <UserItem key={item.email} {...item} />)
      ) : (
        <Typography component="h2">Please Add Users</Typography>
      )}
    </Grid>
  );
};
