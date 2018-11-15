import * as TYPES from '../action-types';

export default function Activities2(state = {
    value:{
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
    },
    isActive: false
}, action) {
    if (!action.value) action.value = 0;
    //根据组件内dispatch派发的对象中type来走对应的操作
    switch (action.type) {
        case TYPES.VOTE_SUPA://引入的是type里的type值
            //state.n=state.n+1;  //这样只会改变不会渲染  因为state的引用地址没变，导致比较的时候前后state相等，所以没触发渲染。
            state = {...state, a: action.value};
            break;
        case TYPES.VOTE_SUPB:
            state = {...state, b: action.value};
            break;
        case TYPES.VOTE_SUPC:
            state = {...state, c: action.value};
            break;
        case TYPES.VOTE_SUPD:
            state = {...state, d: action.value};
            break;
        case TYPES.ACT_TWO:
            state = {...state, value: action.value};
            break;

    }
    state = {...state, e: parseFloat(state.a) + parseFloat(state.b) + parseFloat(state.c) + parseFloat(state.d)};


    return state;
}