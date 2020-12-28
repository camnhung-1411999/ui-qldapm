import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { users } from './user.reducer';
import { files } from './file.reducer';
import { transactions } from './transaction.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  files,
  transactions,
  alert
});

export default rootReducer;