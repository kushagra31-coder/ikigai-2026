import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IKIGAI 2026',
    short_name: 'IKIGAI',
    description: 'The premier technology and innovation platform for IKIGAI 2026.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
