import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/workspace/', '/dev/', '/admin/'],
    },
    sitemap: 'https://ikigai2026.com/sitemap.xml',
  }
}
