import { IUserListData } from '../App';

const checkInitialsDuplicate = (initial: string, userList: Array<IUserListData>): boolean => {
  if (!userList.length) {
    return false;
  }

  const isValidInitial = userList.filter(
    (item) =>
      item.lastname.toLowerCase() === initial.slice(0, 1).toLowerCase() || item.initials === initial
  );

  return !!isValidInitial.length;
};

// export const getInitialsUser = (
//   currentName: Array<string>,
//   userList: Array<IUserListData>
// ): string => {
//   const fistNameArray = currentName[0].split('');
//   const lastNameArray = currentName[currentName.length - 1].split('');

//   const currentInitial = [fistNameArray[0].toUpperCase(), lastNameArray[1].toUpperCase()];

//   if (checkInitialsDuplicate(currentInitial.join(''), userList)) {
//     getInitialsUser(currentName, userList);
//   }

//   return currentInitial.join('');
// };
let count = 1;
export const getInitialsUser = (
  currentName: Array<string>,
  userList: Array<IUserListData>
): (() => string) => {
  count += 1;
  return (): string => {
    const currentInitial =
      currentName[0].substring(0, 1) + currentName[1].substring(0, count).toUpperCase();

    if (checkInitialsDuplicate(currentInitial, userList)) {
      getInitialsUser(currentName, userList);
    }

    if (!checkInitialsDuplicate(currentInitial, userList)) count = 1;
    return currentInitial;
  };
};
