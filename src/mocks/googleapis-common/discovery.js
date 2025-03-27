'use strict';

const discovery = {
  // Mock the problematic functions with stub implementations
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

module.exports = discovery;