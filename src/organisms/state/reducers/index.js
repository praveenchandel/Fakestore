import { combineReducers } from "redux";
import item_reducer from "./item_reducer";

const reducers=combineReducers({
    items:item_reducer
});

export default reducers;