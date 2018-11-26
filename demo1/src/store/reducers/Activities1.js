import * as TYPES from '../action-types';

export default function Activities1(state = {
    n: 0,
    m: 0,
    value:""
}, action) {
    //根据组件内dispatch派发的对象中type来走对应的操作
    switch (action.type) {
        case TYPES.VOTE_SUPA://引入的是type里的type值
            //state.n=state.n+1;  //这样只会改变不会渲染  因为state的引用地址没变，导致比较的时候前后state相等，所以没触发渲染。
            state = {...state, n: state.n + 1};
            break;
        case TYPES.ACT_ONE:
                state={...state,value:action.value};
                break;
    }
    return state;

}