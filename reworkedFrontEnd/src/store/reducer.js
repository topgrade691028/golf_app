import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer
});

export default reducer;
