import { configureStore,combineReducers } from '@reduxjs/toolkit';
import todoSlice from './slice/todoSlice';
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}

const allReducer = combineReducers({
  todo: todoSlice.reducer,

})

const persistedReducer = persistReducer(persistConfig, allReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)
export const todoActions = todoSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
