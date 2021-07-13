import React from 'react';
import {
  Card,
  Grid,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IUserItem {
  email: string;
  initials: string;
  avatarColor: string;
}

export const UserItem: React.FC<IUserItem> = ({ email, initials, avatarColor }: IUserItem) => {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Avatar alt={initials} style={{ backgroundColor: avatarColor }}>
            {initials}
          </Avatar>
          <Typography component="p">email: {email}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/${email}`}>
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
