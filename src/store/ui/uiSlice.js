import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name:'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            // En redux-toolkit se puede crear codigo mutante
            state.isDateModalOpen = true;

            // Si usara Redux normal deberia retornar de esta forma
            /* return {
                ...state,
                isDateModalOpen : true
            } */
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
    }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;