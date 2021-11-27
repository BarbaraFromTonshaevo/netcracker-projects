// import { User } from '../../user/model/user';

import { Assignee } from "./assignee";
export interface Incident {
  id: number;
  name: string;
  assignee: Assignee | null;
  area: string;
  startDate: Date;
  dueDate: Date;
  priority: string;
  description: string,
  status: string;
}
