const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
    register: true,
    disable: process.env.NODE_ENV === 'development',
    scope: '/app',
    sw: 'service-worker.js',
  }
});

module.exports = nextConfig
