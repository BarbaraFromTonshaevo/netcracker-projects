import { users } from "../../user/data/users.data"
export const incidents = [
  {
    id: 12345,
    name: "Testing adaptive",
    assignee: users[0],
    area: "Web",
    startDate: new Date(2021, 0, 1),
    dueDate: new Date(2021, 3, 10),
    status: 'Закрыто',
  },
  {
    id: 12325,
    name: "Create layout design",
    area: "Web",
    startDate: new Date(2021, 6, 22),
    dueDate: new Date(2021, 11, 14),
    status: 'Открыто',
  },
]
