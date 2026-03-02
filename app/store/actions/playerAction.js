export const SET_PLAYING_EPISODE = 'SET_PLAYING_EPISODE';
export const CLEAR_PLAYING_EPISODE = 'CLEAR_PLAYING_EPISODE';

export const setPlayingEpisode = (episodeId) => ({
  type: SET_PLAYING_EPISODE,
  payload: episodeId
});

export const clearPlayingEpisode = () => ({
  type: CLEAR_PLAYING_EPISODE
});
