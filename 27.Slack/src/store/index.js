import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer"

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  theme: themeReducer
})

export default rootReducer;