'use client'

import { useState } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'
import { Send, FileText, Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ContactClient({ resumeUrl }: { resumeUrl: string | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      const res = await fetch('/api/public/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to send message')

      toast.success('Message sent successfully! I will get back to you soon.')
      ;(e.target as HTMLFormElement).reset()
    } catch (_error) {
      toast.error('Failed to send message. Please try again or connect via LinkedIn.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-black">
      <SectionTitle 
        title="Get In Touch" 
        subtitle="Let's build something intelligent together."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <p className="text-zinc-400 mb-6">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:contact@example.com"
                className="flex items-center text-zinc-300 hover:text-cyan-400 transition-colors"
              >
                <span className="w-8">✉️</span> contact@example.com
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-zinc-300 hover:text-cyan-400 transition-colors"
              >
                <span className="w-8">🔗</span> LinkedIn
              </a>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-cyan-950/20 border border-cyan-900/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyan-500" /> Resume / CV
            </h3>
            <p className="text-zinc-400 mb-6 text-sm">
              Review my complete professional history, skills, and educational background.
            </p>
            {resumeUrl ? (
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            ) : (
              <span className="block w-full text-center py-3 text-sm text-zinc-600 font-medium border border-zinc-800 rounded-lg">
                Resume currently unavailable
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required
                className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                placeholder="Project Inquiry"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5}
                required
                className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none"
                placeholder="Hello Nitin, I'd like to discuss..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-lg bg-white px-6 py-4 text-sm font-bold text-black shadow-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}
