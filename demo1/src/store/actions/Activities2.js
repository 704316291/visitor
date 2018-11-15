import *as TYPES from '../action-types';

let Activities2 = {
   oneInput(value) {//通过函数执行返回一个对象来使用dispatch派发
        return {
            type: TYPES.VOTE_SUPA,
            value
        };
    },
    twoInput(value) {
        return {
            type: TYPES.VOTE_SUPB,
            value
        };
    },
    threeInput(value) {
        return {
            type: TYPES.VOTE_SUPC,
            value
        };
    },
    fourInput(value){
        return{
            type:TYPES.VOTE_SUPD,
            value
        }

    },
    totalNumber(value){
       return{
           type:TYPES.VOTE_TOTAL,
           value
       }
    },

    addValue2(value){
        return{
            type:TYPES.ACT_TWO,
            value
        }

    }


};
export default Activities2


