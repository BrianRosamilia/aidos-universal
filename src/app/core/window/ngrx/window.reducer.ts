import { WindowAction, WindowActionType, WindowActionTypes } from './window.actions';

import { Record } from 'immutable';

export interface WindowState {
  width: number;
  height: number;
}

const initialWindow = {
  width: undefined,
  height: undefined
};

class WindowStateRecord extends Record(initialWindow) implements WindowState {
  width: number;
  height: number;
  constructor(data) {
    super(data);
  }
}

export function windowReducer(state: WindowState = new WindowStateRecord(initialWindow), action: WindowAction): WindowState {
  switch (action.type) {
    case WindowActionTypes[WindowActionType.RESIZE]:
      state = Object.assign({}, state, action.payload);
      break;
    default:
  }
  return state;
};
