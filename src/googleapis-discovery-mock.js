'use strict';

// Mock discovery module
module.exports = {
  // Provide mock implementations of all required functions
  discoverAPIs: async () => {
    console.log('Mock discoverAPIs called');
    return [];
  },
  
  getDiscoveryDoc: async () => {
    console.log('Mock getDiscoveryDoc called');
    return {};
  },
  
  makeDirectory: () => {
    console.log('Mock makeDirectory called');
    return Promise.resolve();
  },
  
  writeDiscoveryToFile: () => {
    console.log('Mock writeDiscoveryToFile called');
    return Promise.resolve();
  }
};