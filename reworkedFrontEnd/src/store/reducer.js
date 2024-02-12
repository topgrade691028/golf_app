import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import competitionReducer from './reducers/competitionReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  competition: competitionReducer
});

export default reducer;
