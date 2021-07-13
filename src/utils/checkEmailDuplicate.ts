import { IUserListData } from '../App';

export const checkEmailDuplicate = (email: string, userList: Array<IUserListData>): boolean =>
  userList.length ? !!userList.filter((el: IUserListData) => el.email === email).length : false;
