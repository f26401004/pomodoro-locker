/**
 * state: {
 *  'contextID': {
 *      title: String,
 *      startTime: Date
 *      endTime: Date
 *      sessions: [{
 *          id: String
 *          host: String
 *      }]
 *  }
 * }
 */

export default (
  state = {
    test_context_123: {
      title: "Test Context",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 1000 * 60 * 1),
      sessions: [
        {
          id: "test_session_123",
          host: "facebook.com",
        },
      ],
    },
  },
  action
) => {
  switch (action.type) {
    case "SET_CONTEXT":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
