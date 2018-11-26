import {combineReducers} from "redux";
import Home from "./Home";
import Activities1 from "./Activities1"
import Activities2 from "./Activities2";
import Activities3 from "./Activities3";
import Activities5 from "./Activities5";
import Language from "./Language"


/*写入reducer导出的文件名称*/
let reducer = combineReducers({
    Home,
    Activities1,
    Activities2,
    Activities3,
    Activities5,
    Language,
});
export default reducer