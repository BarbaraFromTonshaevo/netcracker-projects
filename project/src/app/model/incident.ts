import {User} from './user'
export interface Incident {
  id: number;
  name: string;
  assignee?: User;
  area: string;
  startDate: Date;
  dueDate: Date;
  status: string;
}
