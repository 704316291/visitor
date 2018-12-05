import * as TYPES from '../action-types';

export default function Activities1(state = {
    value:""
}, action) {
    //根据组件内dispatch派发的对象中type来走对应的操作
    switch (action.type) {
        case TYPES.ACT_ONE:
                state={...state,value:action.value};
                break;
    }
    return state;

}