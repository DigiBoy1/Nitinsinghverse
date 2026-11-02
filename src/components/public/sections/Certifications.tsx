import { getPublicResource } from '@/lib/api/publicData'
import { CertificationsClient } from './CertificationsClient'

export async function Certifications() {
  const certificates = await getPublicResource<any[]>('certificates', { order: { column: 'display_order', ascending: true } }) || []
  const badges = await getPublicResource<any[]>('badges', { order: { column: 'display_order', ascending: true } }) || []

  if (!certificates.length && !badges.length) return null

  return <CertificationsClient certificates={certificates} badges={badges} />
}
