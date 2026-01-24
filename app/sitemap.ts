import { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { works } from '@/lib/data'
import { teamMembers } from '@/lib/team'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mksuko.com'

  const staticRoutes = [
    '/home',
    '/about',
    '/services',
    '/works',
    '/blog',
    '/contact',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/home' ? 1 : 0.8,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const workRoutes = works.map((work) => ({
    url: `${baseUrl}/works/${work.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const teamRoutes = teamMembers.map((member) => ({
    url: `${baseUrl}/team/${member.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...teamRoutes]
}
