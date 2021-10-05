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

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTEXT":
      console.log(action.payload);
      return { ...action.payload };
    default:
      return state;
  }
};
