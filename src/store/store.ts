import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { Environments } from "../enums/enums";
import { rootReducer } from "./reducers";
import { initialState } from "./state";

/* tslint:disable */
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: () => any;
    }
}
/* tslint:enable */

const middlewares = [];

if (process.env.NODE_ENV === Environments.Development) {
    middlewares.push(logger);
}

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || ((s: any) => s),
    ),
);

export default store;
