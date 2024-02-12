export const SET_COMPETITION_ID = '@competition/SET_COMPETITION_ID';

export const selectedCompetition = competitionId => dispatch => {
  dispatch({
    type: SET_COMPETITION_ID,
    payload: competitionId,
  });
};