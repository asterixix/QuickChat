'use strict';

// Import our mocked common module
const common = require('./googleapis-common-mock');

// Create a mock calendar API
const calendar = {
  events: {
    list: () => Promise.resolve({
      data: {
        items: [
          { 
            id: '1', 
            summary: 'Sample Meeting', 
            start: { dateTime: new Date().toISOString() },
            end: { dateTime: new Date(Date.now() + 3600000).toISOString() }
          }
        ]
      }
    }),
    insert: (params) => Promise.resolve({
      data: {
        id: Math.random().toString(36).substring(2, 11),
        summary: params.resource.summary,
        start: params.resource.start,
        end: params.resource.end
      }
    })
  }
};

// Create GoogleApis class that returns our mock APIs
class GoogleApis {
  constructor() {
    this.calendar = (version) => {
      console.log(`Mock calendar API v${version} initialized`);
      return calendar;
    };
    
    // Add other APIs as needed
    this.drive = (version) => ({});
    this.gmail = (version) => ({});
    
    // Reference to common
    this.common = common;
  }
}

// Export the mock GoogleAPIs
module.exports = {
  google: new GoogleApis()
};