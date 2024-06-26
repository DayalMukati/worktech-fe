export const getStatusNumber = (status: string) => {
  switch (status) {
    case "todo":
      return 1;
    case "in-progress":
      return 2;
    case "in-review":
      return 3;
    case "done":
      return 4;
    case "backlog":
      return 5;
    default:
      return 1;
  }
};
