import *as TYPES from '../action-types';
let Activities4 = {
    supA() {//通过函数执行返回一个对象来使用dispatch派发
        return {
            type: TYPES.VOTE_SUPA
        };
    },
    supB() {
        return {
            type: TYPES.VOTE_SUPB
        };
    }
};
export default Activities4;