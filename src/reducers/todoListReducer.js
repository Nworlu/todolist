export const initialTodos = [];
export const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo, index) => {
        if (index === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case "ADD_TASKS":
      return [
        ...state,
        {
          id: state.length + 1,
          title: action.payload,
          complete: false,
        },
      ];
    case "DELETE_TASK":
      return state.filter((todo, index) => index !== action.id);
  }
};
