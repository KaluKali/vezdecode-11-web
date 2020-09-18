import * as types from "./actionTypes";

import {ROOT_VIEW} from "../../../constants/ViewConstants";
import {HELLO_PANEL} from "../../../constants/PanelConstants";

const initialState = {
  activeView: ROOT_VIEW,
  activePanel: HELLO_PANEL,
  history: [HELLO_PANEL],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.payload,
        history: [...state.history, action.payload],
      };

    case types.SET_ACTIVE_VIEW: {
      const { viewId, panelId } = action.payload;

      return {
        ...state,
        activeView: viewId,
        activePanel: panelId,
      };
    }

    case types.SET_PREVIOUS_PANEL:
      return {
        ...state,
        activePanel: action.payload[action.payload.length - 1],
        history: [...action.payload],
      };
    default:
      return state;
  }
};

export default historyReducer;
