
import authReducer from "./userReducer";
//import userReducer from "./userReducer";
const { combineReducers } = require("redux");
// reducers/index.js
const rootreducer   = combineReducers({
    auth : authReducer
})
export default rootreducer;