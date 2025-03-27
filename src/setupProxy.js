const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/cloudflare',
    createProxyMiddleware({
      target: 'https://api.cloudflare.com',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        // Rewrite /api/cloudflare to /client/v4/calls
        '^/api/cloudflare': '/client/v4/calls'
      },
      onProxyReq: (proxyReq, req) => {
        console.log(`Proxying ${req.method} request to: ${proxyReq.path}`);
        proxyReq.setHeader('Content-Type', 'application/json');
      },
      logLevel: 'debug'
    })
  );
};