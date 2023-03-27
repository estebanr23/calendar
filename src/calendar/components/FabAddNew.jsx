import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {
    
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        // Si la nota no tiene id es nueva, si tiene id es que ya existe
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name:'Esteban'
            }
        });

        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
