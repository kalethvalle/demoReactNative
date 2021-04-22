import { ADDCART, SUBTRACTCART } from './actionTypes';

const  initialState = {
    counterCart: 0,
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case ADDCART:
            return { ...state, counterCart:  state.counterCart + 1};
        case SUBTRACTCART:
            return { ...state, counterCart:  state.counterCart - 1};
        default: 
            return  state;
    }
}