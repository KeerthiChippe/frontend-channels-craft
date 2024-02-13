import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionplugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'

export default function Calendar({formattedDate}){
    const [events, setEvents] = useState('')

    useEffect(() => {
        if (formattedDate) {
          const expiryEvent = {
            title: 'Expiry date',
            start: formattedDate,
            allDay: true, // Set it to true if you want it to span the whole day
          };
          setEvents([expiryEvent]);
        }
      }, [formattedDate])

    return(
        <div>
            <FullCalendar 
                plugins={[dayGridPlugin, timeGridPlugin, interactionplugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: "",
                    center: "title",
                    end: "today prev, next"
                }}
                events={events}
            />
        </div>
    )
}