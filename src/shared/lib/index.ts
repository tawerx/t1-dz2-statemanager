export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Low":
      return "#d4edda"; // зелёный
    case "Medium":
      return "#fff3cd"; // оранжевый
    case "High":
      return "#f8d7da"; // красный
    default:
      return "#fff6eb";
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Bug":
      return "#f8d7da";
    case "Feature":
      return "#cce5ff";
    case "Documentation":
      return "#e2d6f3";
    case "Refactor":
      return "#e2e3e5";
    case "Test":
      return "#d4edda";
    default:
      return "#fff6eb";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "#fff3cd";
    case "In Progress":
      return "#cce5ff";
    case "Done":
      return "#d4edda";
    default:
      return "#fff6eb";
  }
};
