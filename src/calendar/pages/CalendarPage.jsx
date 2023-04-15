import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, NavBar, FabDelete } from '../';
import { getMessagesES, localizer, useAuthStore } from '../../helpers';
import { useEffect, useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventstyleGetter = ( event, start, end, isSelected ) => {
    
    // Para saber los eventos de un usuario consulto el evento.user y pregutno por el _id y uid
    // _id devuelve el backend y uid devuelve el frontend cada vez q se actualiza un evento
    // Se puede cambiar en el backend para que devuelva uid y sea todo homogeneo
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660', // Si es mi evento lo muestro con un color sino con otro
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventstyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
