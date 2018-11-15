import *as TYPES from '../action-types';

let Activities = {
    supA() {//通过函数执行返回一个对象来使用dispatch派发
        return {
            type: TYPES.VOTE_SUPA
        };
    },
    addValue1(value) {
        return {
            type: TYPES.ACT_ONE,
            value
        }
    },

};
export default Activities;