import * as TYPES from '../action-types';

export default function Home(state={cleanValue:""},action) {
    switch(action.type){
        case TYPES.ClEAR_DATA:
            state={...state,cleanValue:action.cleanValue};
            break;
    }
    return state;
}
