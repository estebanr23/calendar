import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, NavBar } from '../';
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';

const events = [{
  title: 'Cumpleanos del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name:'Esteban'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventstyleGetter = ( event, start, end, isSelected ) => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event })
  }

  const onSelect = ( event ) => {
    console.log({ click: event })
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

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

    </>
  )
}
