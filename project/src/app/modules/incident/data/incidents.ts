export const incidents = [
  {
    id: 54321,
    name: "Testing adaptive",
    assignee: {
      id: 12345,
      fullname: {
        name: 'Александра',
        surname: 'Александрова',
        lastname: 'Александровна',
      }
    },
    area: "Quality assurance",
    startDate: new Date(2021, 0, 1),
    dueDate: new Date(2021, 3, 10),
    status: 'Закрыто',
  },
  {
    id: 54322,
    name: "Create layout design",
    area: "Design",
    startDate: new Date(2021, 6, 22),
    dueDate: new Date(2021, 11, 14),
    status: 'Открыто',
    assignee: null,
  },
  {
    id: 54323,
    name: "Create logo",
    area: "Design",
    startDate: new Date(2021, 7, 28),
    dueDate: new Date(2021, 8, 4),
    status: 'Закрыто',
    assignee: null,
  },
  {
    id: 54324,
    name: "Анализ стоимости капитала",
    area: "Economy",
    startDate: new Date(2021, 10, 8),
    dueDate: new Date(2021, 11, 4),
    status: 'Разработка',
    assignee: {
      id: 12348,
      fullname: {
        name: 'Теодор',
        surname: 'Драйзер',
        lastname: '',
      },
    }
  },
  {
    id: 54325,
    name: "Правка компонент CDK",
    area: "Frontend development",
    startDate: new Date(2021, 10, 2),
    dueDate: new Date(2022, 1, 22),
    status: 'Открыто',
    assignee: null,
  },
  {
    id: 54326,
    name: "Разработка структуры базы данных",
    area: "Software development",
    startDate: new Date(2021, 10, 2),
    dueDate: new Date(2022, 1, 22),
    status: 'Открыто',
    assignee: null,
  },
]
