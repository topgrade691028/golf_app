import reducer from './reducer';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);

// const composeEnhancers =
//   process.env.NODE_ENV === 'production'
//     ? compose
//     : composeWithDevTools({
//       // Specify name here, actionsBlacklist, actionsCreators and other options if needed
//     });

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const persister = '';

export { store, persister };
