import { WindowAction, WindowActionType, WindowActionTypes } from './window.actions';

import { Record } from 'immutable';

export interface WindowState {
  width: number;
  height: number;
}

const WindowRecord = Record({
  width: undefined,
  height: undefined
});

class WindowStateRecord extends WindowRecord implements WindowState {
  width: number;
  height: number;
  constructor(data) {
    super(data);
  }
}

const initialState: WindowStateRecord = new WindowStateRecord({
  width: undefined,
  height: undefined
});

export function windowReducer(state: WindowState = initialState, action: WindowAction): WindowState {
  switch (action.type) {
    case WindowActionTypes[WindowActionType.RESIZE]:
      state = Object.assign({}, state, action.payload);
      break;
    default:
  }
  return state;
};
