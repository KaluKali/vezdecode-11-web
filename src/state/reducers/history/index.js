import * as types from "./actionTypes";

import {ROOT_VIEW} from "../../../constants/ViewConstants";
import {HELLO_PANEL} from "../../../constants/PanelConstants";

const initialState = {
  activeView: ROOT_VIEW,
  activePanel: HELLO_PANEL,
  history: [{panelId: HELLO_PANEL, viewId: ROOT_VIEW}],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.payload.panelId,
        history: [...state.history, action.payload],
      };

    case types.SET_ACTIVE_VIEW: {
      const { viewId, panelId } = action.payload;

      return {
        ...state,
        activeView: viewId,
        activePanel: panelId,
        history: [...state.history, action.payload.history],
      };
    }

    case types.SET_PREVIOUS_PANEL:
      return {
        ...state,
        activeView: action.payload[action.payload.length - 1].viewId,
        activePanel: action.payload[action.payload.length - 1].panelId,
        history: [...action.payload],
      };
    default:
      return state;
  }
};

export default historyReducer;
