import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    // Recibe un evento del componente del calendario
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {

            if ( calendarEvent.id ) {
                // Actualizando
                // Al agregar corchetes y ..., estoy mandando un nuevo objeto, podria pasar el objeto sin hacer esto tambien
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            } else {
                // Creando
                const { data } = await calendarApi.post('/events', calendarEvent);
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }   
    }

    const startDeleteEvent = async() => {
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
       
    }

    const startLoadingEvents = async() => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );
            
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
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
        startLoadingEvents,
    }
}
