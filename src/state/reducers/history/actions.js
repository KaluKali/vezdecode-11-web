import bridge from "@vkontakte/vk-bridge";

import * as types from "./actionTypes";
import {VK_APP_CLOSE} from "../../../constants/BridgeConstants";

export const setActivePanel = (panelId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { activePanel } = state.history;

    if (activePanel === panelId) {
      return;
    }

    window.history.pushState({ panel: panelId }, panelId);
    dispatch({
      type: types.SET_ACTIVE_PANEL,
      payload: panelId,
    });
  };
};

export const setActiveView = ({ panelId, viewId }) => ({
  type: types.SET_ACTIVE_VIEW,
  payload: { panelId, viewId },
});

export const setPreviousPanel = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { history } = state.history;

    if (history.length === 1) {
      return bridge.send(VK_APP_CLOSE, { status: "success" });
    }

    const newHistory = history.slice(0, history.length - 1);

    return dispatch({ type: types.SET_PREVIOUS_PANEL, payload: newHistory });
  };
};
