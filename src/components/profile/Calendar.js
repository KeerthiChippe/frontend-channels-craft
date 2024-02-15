// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionplugin from '@fullcalendar/interaction'
// import { useState, useEffect } from 'react'

// export default function Calendar({formattedDates}){
//     const [events, setEvents] = useState('')

//     useEffect(() => {
//       if (formattedDates && formattedDates.length > 0) {
//         const expiryEvents = formattedDates.map(date => ({
//           title: 'Expiry date',
//           start: date,
//           allDay: true, // Set it to true if you want it to span the whole day
//         }));
//         setEvents(expiryEvents);
//       }
//     }, [formattedDates])
//     return(
//         <div>
//             <FullCalendar 
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionplugin]}
//                 initialView={'dayGridMonth'}
//                 headerToolbar={{
//                     start: "",
//                     center: "title",
//                     end: "today prev, next"
//                 }}
//                 events={events}
//             />
//         </div>
//     )
// }
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import { Tooltip } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Calendar({ formattedDates }) {
    const [events, setEvents] = useState([])

    // useEffect(() => {
    //     if (formattedDates && formattedDates.length > 0) {
    //         const expiryEvents = formattedDates.map(item => ({
    //             title: item.type === 'package' ? `Package: ${item.name}` : `Channel: ${item.name}`,
    //             start: item.date,
    //             allDay: true, // Set it to true if you want it to span the whole day
    //             color: item.type === 'package' ? '#4caf50' : '#2196f3', // Green for packages, Blue for channels
    //             textColor: '#fff', // White text color for better visibility
    //         }));
    //         setEvents(expiryEvents);
    //     }
    // }, [formattedDates])

    return (
        <div style={{ position: 'absolute', top: '80px', right: '20px', zIndex: '99' }}>
           <div style={{ width: '800px', margin: 'auto' }}>
          {/* <div style={{ float: 'right', width: 'calc(100% - 350px)' }}> */}
            {/* <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: "",
                    center: "title",
                    end: "today prev,next"
                }}
                events={events}
                eventDidMount={renderEventContent}
            /> */}
            <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: "",
          center: "title",
          end: "today prev, next"
        }}
        events={formattedDates.map(({ type, name, expiryDate }) => ({
          title: `${type === 'package' ? 'Package' : 'Channel'}: ${name}`,
          start: expiryDate,
          allDay: true,
        }))}
      />
      </div>
        </div>
    )
}


