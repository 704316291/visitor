import * as TYPES from '../action-types';

export default function Language(state = {
    local:"en"
}, action) {
    switch (action.type) {
        case TYPES.CHANGE_LANGUAGE://引入的是type里的type值
            if(state.local==="en"){
                state = {...state, local: "zh"};
            }else{
                state = {...state, local: "en"};
            }

            break;
    }
    return state;

}