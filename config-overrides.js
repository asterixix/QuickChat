const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

// Custom plugin to handle node: protocol
class NodeProtocolResolver {
  constructor(source, target) {
    this.source = source;
    this.target = target;
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target);
    resolver.getHook(this.source).tapAsync("NodeProtocolResolver", (request, resolveContext, callback) => {
      if (request.request && request.request.startsWith('node:')) {
        // Remove the "node:" prefix
        const moduleName = request.request.substring(5);
        const obj = {
          ...request,
          request: moduleName
        };
        return resolver.doResolve(target, obj, null, resolveContext, callback);
      }
      callback();
    });
  }
}

module.exports = function override(config) {
  // Initialize fallback if it doesn't exist
  if (!config.resolve) config.resolve = {};
  if (!config.resolve.fallback) config.resolve.fallback = {};
  
  // Set up fallbacks for Node.js core modules
  config.resolve.fallback = {
    "assert": require.resolve("assert/"),
    "buffer": require.resolve("buffer/"),
    "child_process": false,
    "crypto": require.resolve("crypto-browserify"),
    "events": require.resolve("events/"),
    "fs": false,
    "http": require.resolve("stream-http"),
    "http2": false,
    "https": require.resolve("https-browserify"),
    "net": false,
    "os": require.resolve("os-browserify/browser"),
    "path": require.resolve("path-browserify"),
    "process": require.resolve("process/browser"),
    "querystring": require.resolve("querystring-es3"),
    "stream": require.resolve("stream-browserify"),
    "tls": false,
    "url": require.resolve("url/"),
    "util": require.resolve("util/"),
    "zlib": require.resolve("browserify-zlib")
  };

  // Use string replacement to handle node: protocol
  config.module.rules.unshift({
    test: /\.js$/,
    loader: 'string-replace-loader',
    options: {
      search: /node:(\w+)/g,
      replace: '$1',
      flags: 'g'
    }
  });

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    // Provide global polyfills
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    
    // Use NormalModuleReplacementPlugin to replace modules
    new webpack.NormalModuleReplacementPlugin(
      /^googleapis-common$/,
      path.resolve(__dirname, 'src/googleapis-common-mock.js')
    ),
    
    new webpack.NormalModuleReplacementPlugin(
      /^googleapis$/,
      path.resolve(__dirname, 'src/googleapis-mock.js')
    ),
    
    // Add Node polyfill plugin
    new NodePolyfillPlugin(),
    
    // Define process.stdout and process.stderr
    new webpack.DefinePlugin({
      'process.stdout': JSON.stringify({ isTTY: false }),
      'process.stderr': JSON.stringify({ isTTY: false })
    })
  ]);

  // Loop through rules to exclude the gtoken module from source-map-loader
  config.module.rules.forEach((rule) => {
    if (
      rule.enforce === 'pre' &&
      rule.use &&
      Array.isArray(rule.use) &&
      rule.use.find((u) => u.loader && u.loader.includes('source-map-loader'))
    ) {
      // Exclude gtoken folder
      rule.exclude = rule.exclude ? rule.exclude : [];
      rule.exclude.push(/node_modules[\\/]gtoken/);
    }
  });

  return config;
};