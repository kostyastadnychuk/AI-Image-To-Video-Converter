/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'designimages.appypie.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/**',
        },
      ],
    },
    async redirects() {
      return [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'admin.forbio.ai',
            },
          ],
          destination: '/admin',
          permanent: false,
        },
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'forbio.ai',
            },
          ],
          destination: '/home',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  