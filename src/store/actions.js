import { INITIALIZE_CART, ADDCART, SUBTRACTCART, FUNCTIONTO_KEN, SET_USER, FUNCTION_CART_ANIME } from './actionTypes';

export const initialize_cart = () => ({
    type: INITIALIZE_CART,
})

export const additionCart = () => ({
    type: ADDCART,
})

export const subtraction = () => ({
    type: SUBTRACTCART,
})

export const function_token = (payload) => ({
    type: FUNCTIONTO_KEN,
    payload,
});

export const set_user = (payload) => ({
    type: SET_USER,
    payload,
})

export const function_cart_anime = (payload) => ({
    type: FUNCTION_CART_ANIME,
    payload,
})

