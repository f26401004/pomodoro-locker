/**
 * state: {
 *  'contextID': {
 *      title: String,
 *      sessions: [{
 *          id: String
 *          host: String,
 *          endTime: Date
 *
 *      }]
 *  }
 * }
 */

export default (
  state = {
    test_context_123: {
      title: "Test Context",
      sessions: [
        {
          id: "test_session_123",
          host: "facebook.com",
          endTime: new Date(Date.now + 1000 * 60 * 60),
        },
      ],
    },
  },
  action
) => {
  switch (action.type) {
    case "SET_CONTEXT":
      return action.payload;
    default:
      return state;
  }
};
