import { HeaderAction, HeaderActionType, HeaderActionTypes } from './header.actions';

import { Record } from 'immutable';

export interface HeaderState {
  navbarCollapsed: boolean;
};

const HeaderRecord = Record({
  navbarCollapsed: true
});

class HeaderStateRecord extends HeaderRecord implements HeaderState {
  navbarCollapsed: boolean;
  constructor(data) {
    super(data);
  }
}

const initialState: HeaderStateRecord = new HeaderStateRecord({
  navbarCollapsed: true
});

export function headerReducer(state: HeaderState = initialState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case HeaderActionTypes[HeaderActionType.COLLAPSE]:
      state = Object.assign({}, state, { navbarCollapsed: true });
      break;
    case HeaderActionTypes[HeaderActionType.EXPAND]:
      state = Object.assign({}, state, { navbarCollapsed: false });
      break;
    case HeaderActionTypes[HeaderActionType.TOGGLE]:
      state = Object.assign({}, state, { navbarCollapsed: !state.navbarCollapsed });
      break;
    default:
  }
  return state;
};
