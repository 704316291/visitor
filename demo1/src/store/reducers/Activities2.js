import * as TYPES from '../action-types';

export default function Activities2(state = {
    value:{},
    isActive: false
}, action) {
    if (!action.value) action.value = 0;
    switch(action.type) {
        case TYPES.VOTE_SUPA:
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