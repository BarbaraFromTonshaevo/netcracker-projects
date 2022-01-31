export interface User {
  _id: string;
  fullname: {
    name: string,
    surname: string,
    lastname: string,
  },
  login: string,
  dateOfBirth: Date,
  position: string,
  incidents: Array<{
    _id: string,
    name: string,
  }>,
}

export interface UserInfo {
  name: string,
  surname: string,
  lastname: string,
  login: string,
  position: string,
  dateOfBirth: Date,
  incidents:  Array<{
    _id: number,
    name: string,
  }>}
