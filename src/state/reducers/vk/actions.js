import * as types from "./actionTypes";
import bridge from "@vkontakte/vk-bridge";

export const setPodcastIcon = (image) => ({
  type: types.SET_PODCAST_ICON,
  payload: image,
});

export const setPodcastContent = (music) => ({
  type: types.SET_PODCAST_CONTENT,
  payload: music,
});

export const setPodcastForm = (form) => ({
  type: types.SET_PODCAST_FORM,
  payload: form,
});

export const setVkUser = (user) => ({
  type: types.SET_VK_USER,
  payload: user,
});

export const getUser = () => dispatch => {
  bridge.send('VKWebAppGetUserInfo')
      .then(data =>dispatch(setVkUser(data)));
};
