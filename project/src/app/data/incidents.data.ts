export const incidents = [
  {
    id: 12345,
    name: "Testing adaptive",
    assignee: {
      id: 54321,
      fullname: {
        name: 'Иван',
        surname: 'Иванов',
        lastname: 'Иванович',
      }
    },
    area: "Web",
    startDate: new Date(2021, 0, 1),
    dueDate: new Date(2021, 3, 10),
    status: 'Закрыто',
  },
  {
    id: 12325,
    name: "Create layout design",
    assignee: {
      id: 98765,
      fullname: {
        name: 'Александра',
        surname: 'Александрова',
        lastname: 'Александровна',
      }
    },
    area: "Web",
    startDate: new Date(2021, 6, 22),
    dueDate: new Date(2021, 11, 14),
    status: 'Открыто',
  },
]
