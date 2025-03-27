import { google } from 'googleapis';

const calendar = google.calendar('v3');

// Add missing getEvents function
export const getEvents = async (email) => {
  // Mock implementation until proper auth flow is set up
  return [
    { 
      id: '1', 
      title: 'Sample Meeting', 
      start: new Date().toISOString(), 
      end: new Date(Date.now() + 3600000).toISOString() 
    }
  ];
};

export const authenticateGoogle = async (auth) => {
    const { tokens } = await auth.getToken();
    auth.setCredentials(tokens);
    return auth;
};

export const createEvent = async (auth, eventDetails) => {
    const response = await calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: eventDetails,
    });
    return response.data;
};

export const listEvents = async (auth, timeMin, timeMax) => {
    const response = await calendar.events.list({
        auth,
        calendarId: 'primary',
        timeMin,
        timeMax,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    return response.data.items;
};