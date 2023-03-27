import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice, uiSlice } from './';

export const store = configureStore({
    // El store es un reducer que dentro contiene varios reducer. Esta es la idea de Redux.
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})