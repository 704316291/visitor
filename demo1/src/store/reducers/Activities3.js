import * as TYPES from '../action-types';



export default function Activities3(state={
    value:""
},action) {
    switch (action.type){
        case TYPES.ACT_THREE:
            state={...state,value:action.value};
            break;
    }
    return state;
}
