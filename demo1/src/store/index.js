
import{createStore} from "redux";
import reducer from "../store/reducers/index";



let store=createStore(reducer);
export  default store