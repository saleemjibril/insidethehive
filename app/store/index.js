"use client";

import { combineReducers } from 'redux'
import { authReducer } from "./reducers/authReducer";
import { mobileMenuReducer } from './reducers/mobileMenuReducer';
import { playerReducer } from './reducers/playerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
    player: playerReducer,
});

export default rootReducer
