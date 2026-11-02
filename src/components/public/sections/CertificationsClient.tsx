'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, X, Award } from 'lucide-react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'

// Note: In Next.js, Server Components can pass initial data as props to Client Components.
// We make this a Client Component to handle the modal state.
export function CertificationsClient({ certificates, badges }: { certificates: any[], badges: any[] }) {
  const [selectedCert, setSelectedCert] = useState<any | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCert) {
        setSelectedCert(null)
      }
    }
    
    if (selectedCert) {
      document.addEventListener('keydown', handleKeyDown)
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCert])

  if (!certificates.length && !badges.length) return null

  return (
    <>
      <SectionWrapper id="certifications" className="bg-zinc-950">
        <SectionTitle 
          title="Certifications & Badges" 
          subtitle="Official validations of my technical expertise."
        />

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" /> Professional Badges
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {badges.map(badge => (
                <a 
                  key={badge.id}
                  href={badge.verification_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center space-y-3"
                >
                  <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-yellow-500/50 transition-colors p-4">
                    {badge.image_url ? (
                      <Image 
                        src={badge.image_url} 
                        alt={badge.title}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <Award className="h-full w-full text-zinc-700" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {badge.title}
                    </p>
                    <p className="text-xs text-zinc-500">{badge.issuer}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        {certificates.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
              <Award className="h-5 w-5 mr-2 text-cyan-500" /> Formal Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map(cert => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group text-left rounded-xl bg-black border border-zinc-800 hover:border-cyan-600/50 transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full bg-zinc-900 border-b border-zinc-800">
                    {cert.image_url ? (
                      <Image 
                        src={cert.image_url} 
                        alt={cert.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Award className="h-12 w-12 text-zinc-800" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-sm line-clamp-2 mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mb-2">{cert.issuer}</p>
                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <span className="text-xs font-mono text-zinc-600">
                        {new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                      </span>
                      <span className="text-xs text-cyan-600 group-hover:text-cyan-400 font-medium">
                        View
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* Fullscreen Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedCert(null)}
          />
          
          <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h3 className="text-lg font-semibold text-white">{selectedCert.title}</h3>
              <button 
                onClick={() => setSelectedCert(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
              <div className="relative w-full max-w-3xl aspect-[4/3] bg-black border border-zinc-900 rounded-lg overflow-hidden mb-6">
                {selectedCert.image_url ? (
                  <Image 
                    src={selectedCert.image_url} 
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-zinc-600">No Image Available</span>
                  </div>
                )}
              </div>
              
              <div className="w-full max-w-3xl space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-zinc-500 mb-1">Issuer</span>
                    <span className="text-white font-medium">{selectedCert.issuer}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-500 mb-1">Issue Date</span>
                    <span className="text-white font-medium">
                      {new Date(selectedCert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  {selectedCert.credential_id && (
                    <div className="col-span-2">
                      <span className="block text-zinc-500 mb-1">Credential ID</span>
                      <span className="text-white font-mono">{selectedCert.credential_id}</span>
                    </div>
                  )}
                </div>
                
                {selectedCert.description && (
                  <div>
                    <span className="block text-zinc-500 mb-1 text-sm">Description</span>
                    <p className="text-zinc-300 text-sm leading-relaxed">{selectedCert.description}</p>
                  </div>
                )}
                
                {selectedCert.verification_url && (
                  <div className="pt-4 border-t border-zinc-800/50 mt-4 flex gap-4">
                    <a 
                      href={selectedCert.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
                    >
                      Verify Credential <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    {selectedCert.pdf_url && (
                      <a 
                        href={selectedCert.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 transition-colors"
                      >
                        View PDF
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
