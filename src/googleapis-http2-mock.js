'use strict';

// Create a mock http2 object with all required constants
const http2 = {
  constants: {
    HTTP2_HEADER_CONTENT_ENCODING: 'content-encoding',
    HTTP2_HEADER_ACCEPT_ENCODING: 'accept-encoding',
    HTTP2_HEADER_CONTENT_LENGTH: 'content-length',
    HTTP2_HEADER_CONTENT_TYPE: 'content-type',
    HTTP2_HEADER_METHOD: ':method',
    HTTP2_HEADER_PATH: ':path',
    HTTP2_HEADER_STATUS: ':status',
    HTTP2_HEADER_AUTHORITY: ':authority',
    HTTP2_HEADER_HOST: 'host'
  },
  connect: () => {
    throw new Error('HTTP/2 is not supported in browser environments');
  }
};

// Export the proper format that googleapis-common expects
module.exports = {
  request: function() {
    return Promise.reject(new Error('HTTP/2 is not supported in browser environments'));
  },
  DEFAULT_PORT: 443,
  http2: http2  // This is key - export the http2 object itself for destructuring
};