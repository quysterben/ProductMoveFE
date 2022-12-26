import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Home from '~/pages';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={Home} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default DataProvider;
