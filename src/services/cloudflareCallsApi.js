import axios from 'axios';

// With the proxy, BASE_URL is "/api/cloudflare"
// which will be rewritten to: https://api.cloudflare.com/client/v4/calls
const BASE_URL = '/api/cloudflare';

const cloudflareCallsApi = {
  async createCall(uniqueId, pin) {
    try {
      console.log(`Creating call with ID: ${uniqueId} and PIN: ${pin}`);
      
      // Build the payload per Cloudflare Calls HTTPS API.
      // Authentication is provided via the "app" key within the payload.
      const payload = {
        name: uniqueId,
        app: {
          id: process.env.REACT_APP_CLOUDFLARE_APP_ID,
          token: process.env.REACT_APP_CLOUDFLARE_APP_API_TOKEN
        },
        settings: {
          pin,
          participants: { max_devices: 10 },
          recording: { mode: "automatic" },
          media: {
            stun_servers: ['stun:global.stun.cloudflare.com:3478']
          }
        }
      };
      
      // Using a trailing slash ensures the proxy rewrites the URL correctly.
      const response = await axios.post(`${BASE_URL}/`, payload);
      console.log('Call created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Full error details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw new Error('Error creating call: ' + error.message);
    }
  },

  async joinCall(callId, pin) {
    try {
      const response = await axios.post(`${BASE_URL}/${callId}/join`, { pin });
      return response.data;
    } catch (error) {
      throw new Error('Error joining call: ' + error.message);
    }
  },

  async endCall(callId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${callId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error ending call: ' + error.message);
    }
  },

  async getCallDetails(callId) {
    try {
      const response = await axios.get(`${BASE_URL}/${callId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting call details: ' + error.message);
    }
  },
};

export default cloudflareCallsApi;