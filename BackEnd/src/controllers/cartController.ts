import { createStore } from 'redux';

interface CartState {
cart: Order[];
total: number;
}

interface Order {
orderID: string;
productName: string;
totalPrice: number;
}

interface AddToCartAction {
type: 'ADD_TO_CART';
payload: Order;
}

interface RemoveFromCartAction {
type: 'REMOVE_FROM_CART';
payload: Order;
}

type CartAction = AddToCartAction | RemoveFromCartAction;

// Initial state of the store
const initialState: CartState = {
cart: [],
total: 0,
};

// Reducer to handle actions on the state
const reducer = (state = initialState, action: CartAction) => {
switch (action.type) {
case 'ADD_TO_CART':
return {
...state,
cart: [...state.cart, action.payload],
total: state.total + action.payload.totalPrice,
};
case 'REMOVE_FROM_CART':
return {
...state,
cart: state.cart.filter(item => item.orderID !== action.payload.orderID),
total: state.total - action.payload.totalPrice,
};
default:
return state;
}
};

// Create the store
const store = createStore(reducer);

export default store;