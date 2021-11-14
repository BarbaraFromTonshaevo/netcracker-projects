// import { User } from '../../user/model/user';
interface Assignee{
  id: number,
  fullname: {
    name: string,
    surname: string,
    lastname: string,
  }
}
export interface Incident {
  id: number;
  name: string;
  assignee: Assignee | null;
  area: string;
  startDate: Date;
  dueDate: Date;
  status: string;
}
