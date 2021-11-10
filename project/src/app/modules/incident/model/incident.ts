export interface Incident {
  id: number;
  name: string;
  assignee?: {
    id: number,
    fullname: {
      name: string,
      surname: string,
      lastname: string,
    }
  };
  area: string;
  startDate: Date;
  dueDate: Date;
  status: string;
}
