import React from 'react';
import { TextField, Button, MenuItem, Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

import { zodiacSigns, bloodType } from '../constants/constants';
import { getInitialsUser } from '../utils/getInitialsUser';
import { checkEmailDuplicate } from '../utils/checkEmailDuplicate';
import { IUserListData } from '../App';

export interface IUserForm {
  userList: Array<IUserListData>;
  setUserList: React.Dispatch<React.SetStateAction<IUserListData[]>>;
}

interface ITest {
  currentUser: IUserListData[];
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

export const UpdateFormComponent: React.FC<IUserForm & ITest> = ({
  userList,
  setUserList,
  currentUser,
}: IUserForm & ITest) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<IUserListData>();

  const onSubmit = (data: IUserListData) => {
    const isValid = checkEmailDuplicate(data.email, userList);

    if (!isValid) {
      setUserList((prev) => [
        ...prev,
        {
          ...data,
          initials: getInitialsUser([data.firstname, data.lastname], userList)(),
        },
      ]);

      setUserList((state) => {
        const index = state.findIndex((el) => el.email === currentUser[0].email);
        const newItem = {
          avatarColor: '#cf79e1',
          bloodType: 'A (II) - second blood group',
          date: '2021-07-23',
          email: 'dima@fuck.you',
          firstname: 'Dmitry',
          horoskop: 'Taurus',
          initials: 'DTO',
          lastname: 'tovstokory',
        };
        return [...state.slice(0, index), newItem, ...state.slice(index + 1)];
      });
    } else {
      setError('email', { message: 'Email should be unique' });
    }
  };
  console.log(register('email'));
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
          {...register('lastname', { required: 'Last Name is required' })}
          variant="outlined"
          error={!!errors.lastname}
          label="Last Name"
          helperText={errors.lastname ? errors.lastname.message : ''}
        />
        <TextField
          className={classes.formInput}
          variant="outlined"
          error={!!errors.email}
          label="Email"
          helperText={errors.email ? errors.email.message : ''}
          type="email"
          {...register('email', { required: true })}
        />

        <TextField
          className={classes.formInput}
          select
          {...register('horoskop')}
          onChange={(e) => setValue('horoskop', e.target.value)}
          defaultValue=""
          label="Horoskop"
        >
          {zodiacSigns.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classes.formInput}
          select
          {...register('bloodType')}
          onChange={(e) => setValue('bloodType', e.target.value)}
          defaultValue=""
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
          update user
        </Button>
      </form>
    </Container>
  );
};
