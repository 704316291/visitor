import {combineReducers} from "redux";
import  Activities from "./Activities"
import Activities2 from "./Activities2";
 import Activities3 from "./Activities3";
 import  Language from "./Language"
// import Activities4 from "../actions/Activities4";

/*写入reducer导出的文件名称*/
let reducer=combineReducers({
    Activities,
   Activities2,
    Activities3,
    Language,
    // Activities4,
});
export default  reducer