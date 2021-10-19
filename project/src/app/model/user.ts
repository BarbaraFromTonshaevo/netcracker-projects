export interface User {
  id: number;
  fullname: {
    name: string,
    surname: string,
    lastname: string,
  },
  login: string,
  dateOfBirth: Date,
  position: string,
  incidents?: Array<{
    id: number,
    name: string,
  }>
}
