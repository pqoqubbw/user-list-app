import { IUserListData } from '../App';

// export const getInitialsUser = (currentName: Array<string>): string => {
//   const currentInitial =
//     currentName[0].substring(0, 1).toUpperCase() + currentName[1].substring(0, 1).toUpperCase();

//   return currentInitial;
// };

const counter = (
  (count = 1) =>
  (countNumber = 0) => {
    if (!!countNumber) {
      return (count = countNumber);
    }

    return count++;
  }
)();

const checkValid = (initial: string, userList: Array<IUserListData>): boolean => {
  if (!userList.length) {
    return false;
  }

  const isLastNameEnd = !!userList.find(
    (el) => el.lastname.toLowerCase() === initial.slice(1).toLowerCase()
  );

  if (isLastNameEnd) {
    counter(1);
    return false;
  }

  const isValidInitial = userList.filter((item) => item.initials === initial);

  return !!isValidInitial.length;
};

export const getInitialsUser = (
  currentName: Array<string>,
  userList: Array<IUserListData>
): string => {
  const currentInitial =
    currentName[0].substring(0, 1).toUpperCase() +
    currentName[1].substring(0, counter()).toUpperCase();

  if (checkValid(currentInitial, userList)) {
    getInitialsUser(currentName, userList);
  }

  return currentInitial;
};
