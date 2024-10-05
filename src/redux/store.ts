import persistStore from 'redux-persist/es/persistStore';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

let persistor = persistStore(store)


export { persistor, store }; 