import { useState } from 'react';
import { Calendar } from 'react-calendar'; // Supondo uso de react-calendar
import 'react-calendar/dist/Calendar.css';

const events = [
  { date: new Date(), title: 'Reunião', description: 'Reunião com equipe internacional', country: 'BR' },
  { date: new Date(Date.now() + 86400000), title: 'Visita Cliente', description: 'Visita multinacional', country: 'US' },
];

export default function AgendaWidget() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Agenda Multinacional</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="pt-BR"
        tileContent={({ date }: { date: Date }) => {
          const event = events.find(e => e.date.toDateString() === date.toDateString());
          return event ? <span className="bg-visity-accent text-white px-2 rounded">{event.title}</span> : null;
        }}
        tileClassName={({ date }: { date: Date }) => {
          const event = events.find(e => e.date.toDateString() === date.toDateString());
          return event ? 'agenda-event' : '';
        }}
      />
      <div className="mt-4">
        {events.map((event, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredEvent(event)}
            onMouseLeave={() => setHoveredEvent(null)}
            className="mb-2 cursor-pointer"
          >
            <span>{event.date.toLocaleDateString()} - {event.title}</span>
            {hoveredEvent === event && (
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded absolute z-10">
                <strong>{event.title}</strong><br />
                {event.description}<br />
                País: {event.country}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
