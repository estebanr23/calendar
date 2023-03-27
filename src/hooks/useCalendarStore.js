import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    // Recibe un evento del componente del calendario
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if ( calendarEvent._id ) {
            // Actualizando
            // Al agregar corchetes y ..., estoy mandando un nuevo objeto, podria pasar el objeto sin hacer esto tambien
            dispatch( onUpdateEvent({ ...calendarEvent }) )
        } else {
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeleteEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        //* Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent, // Si es null regresa falso. Sirve para ocultar el btn de eliminar si no hay nota activa

        //* Metodos
        setActiveEvent, 
        startSavingEvent, 
        startDeleteEvent,
    }
}
