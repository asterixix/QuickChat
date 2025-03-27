'use strict';

// Create a Discovery class constructor
class Discovery {
  constructor() {
    this.discoverAPIs = async () => {
      console.log('Mock discoverAPIs called');
      return [];
    };
    
    this.getDiscoveryDoc = async () => {
      console.log('Mock getDiscoveryDoc called');
      return {};
    };
  }
  
  // Static methods
  static makeDirectory() {
    console.log('Mock makeDirectory called');
    return Promise.resolve();
  }
  
  static writeDiscoveryToFile() {
    console.log('Mock writeDiscoveryToFile called');
    return Promise.resolve();
  }
}

// Create dummy request methods
const createAPIRequest = () => {
  return Promise.resolve({ data: {} });
};

// Export the module with all required components
module.exports = {
  Discovery: Discovery,
  createAPIRequest: createAPIRequest,
  MethodOptions: class {},
  GlobalOptions: class {},
  APIRequestContext: class {},
  Endpoint: class {},
  // Add other required exports
  getAPI: () => ({}),
  GoogleAuth: class {
    getClient() { return Promise.resolve({}); }
    getProjectId() { return Promise.resolve('mock-project'); }
  }
};