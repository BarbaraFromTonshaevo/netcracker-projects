import { Assignee } from "./assignee";
export interface Incident {
  _id: string;
  name: string;
  assignee: Assignee | null;
  area: string;
  startDate: Date;
  dueDate: Date;
  priority: string;
  description: string,
  status: string;
}

export interface IncidentInfo{
  name: string,
  assignee: Assignee | null;
  area: string;
  startDate: Date;
  dueDate: Date;
  priority: string,
  description: string,
  status: string,
}
