import { SET_COMPETITION_ID } from '../actions/competitionActions';

const initialState = {
  competitionId: 1
}
const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPETITION_ID:
      return { ...state, competitionId: action.payload };
    default:
      return state;
  }
};

export default competitionReducer;
