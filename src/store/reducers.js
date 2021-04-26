import { INITIALIZE_CART, ADDCART, SUBTRACTCART, FUNCTIONTO_KEN, SET_USER, FUNCTION_CART_ANIME } from './actionTypes';

const initialState = {
    // pathApi: 'http://localhost',
    pathApi: 'http://facturadminvallesoft.tk',
    counterCart: 0,
    loggedIn: '',
    user: {},
    cart_anime: [],
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALIZE_CART:
            return { ...state, counterCart:  state.counterCart = 0};
        case ADDCART:
            return { ...state, counterCart:  state.counterCart + 1};
        case SUBTRACTCART:
            return { ...state, counterCart:  state.counterCart - 1};
        case FUNCTIONTO_KEN:
            return { ...state, loggedIn: action.payload};
        case SET_USER:
            return { ...state, user: action.payload};
        case FUNCTION_CART_ANIME:
            return { ...state, cart_anime: action.payload};
        default: 
            return  state;
    }
}