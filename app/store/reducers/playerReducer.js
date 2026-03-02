import { SET_PLAYING_EPISODE, CLEAR_PLAYING_EPISODE } from '../actions/playerAction';

const initialState = {
  playingEpisodeId: null
};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYING_EPISODE:
      return {
        ...state,
        playingEpisodeId: action.payload
      };
    case CLEAR_PLAYING_EPISODE:
      return {
        ...state,
        playingEpisodeId: null
      };
    default:
      return state;
  }
};
