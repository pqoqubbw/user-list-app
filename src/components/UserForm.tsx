import React, { useEffect } from 'react';
import { TextField, Button, MenuItem, Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

import { zodiacSigns, bloodType } from '../constants/constants';
import { getInitialsUser } from '../utils/getInitialsUser';
import { checkEmailDuplicate } from '../utils/checkEmailDuplicate';
import { getRandomColor } from '../utils/getRandomColor';
import { IUserListData } from '../App';

export interface IUserForm {
  userList: Array<IUserListData>;
  setUserList: React.Dispatch<React.SetStateAction<IUserListData[]>>;
}

const useStyles = makeStyles(() => ({
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '32px',
  },
  formInput: {
    width: '100%',
    marginBottom: '16px',
  },
}));

export const UserForm: React.FC<IUserForm> = ({ userList, setUserList }: IUserForm) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IUserListData>();

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  const onSubmit = (data: IUserListData) => {
    const isValid = checkEmailDuplicate(data.email, userList);

    if (!isValid) {
      setUserList((prev) => [
        ...prev,
        {
          ...data,
          id: prev.length + 1,
          initials: getInitialsUser([data.firstname, data.lastname], userList),
          avatarColor: getRandomColor(),
        },
      ]);
      reset();
    } else {
      setError('email', {
        message: 'Email should be unique',
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          className={classes.formInput}
          variant="outlined"
          error={!!errors.firstname}
          label="First Name"
          helperText={errors.firstname ? errors.firstname.message : ''}
          {...register('firstname', { required: 'First Name is required' })}
        />
        <TextField
          className={classes.formInput}
          variant="outlined"
          error={!!errors.lastname}
          label="Last Name"
          helperText={errors.lastname ? errors.lastname.message : ''}
          {...register('lastname', { required: 'Last Name is required' })}
        />
        <TextField
          className={classes.formInput}
          variant="outlined"
          error={!!errors.email}
          label="Email"
          helperText={errors.email ? errors.email.message : ''}
          {...register('email', { required: 'Email is required' })}
        />

        <TextField
          {...register('horoskop')}
          className={classes.formInput}
          select
          defaultValue=""
          onChange={(e) => setValue('horoskop', e.target.value)}
          label="Horoskop"
        >
          {zodiacSigns.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register('bloodType')}
          className={classes.formInput}
          select
          defaultValue=""
          onChange={(e) => setValue('bloodType', e.target.value)}
          label="Blood Type"
        >
          {bloodType.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classes.formInput}
          variant="outlined"
          label=""
          type="date"
          {...register('date')}
        />
        <Button color="primary" type="submit" variant="contained">
          Add User
        </Button>
      </form>
    </Container>
  );
};
