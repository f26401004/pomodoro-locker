export const setContext = (payload) => ({
  type: "SET_CONTEXT",
  payload,
});

export const createContext = (payload) => ({
  type: "CREATE_CONTEXT",
  payload,
});

export const updateContext = (payload) => ({
  type: "UPDATE_CONTEXT",
  payload,
});

export const deleteContext = (payload) => ({
  type: "DELETE_CONTEXT",
  payload,
});
