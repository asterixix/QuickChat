import React, { useEffect, useState } from 'react';
import { getEvents, createEvent } from '../services/googleCalendarApi';
import useAuth from '../hooks/useAuth';

const Calendar = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            if (user) {
                const fetchedEvents = await getEvents(user.email);
                setEvents(fetchedEvents);
            }
        };
        fetchEvents();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createEvent(newEvent);
        setNewEvent({ title: '', start: '', end: '' });
        const updatedEvents = await getEvents(user.email);
        setEvents(updatedEvents);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Event Title"
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="datetime-local"
                    name="start"
                    value={newEvent.start}
                    onChange={handleInputChange}
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="datetime-local"
                    name="end"
                    value={newEvent.end}
                    onChange={handleInputChange}
                    className="border p-2 mr-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Create Event</button>
            </form>
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id} className="border-b py-2">
                        <strong>{event.title}</strong> - {new Date(event.start).toLocaleString()} to {new Date(event.end).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;