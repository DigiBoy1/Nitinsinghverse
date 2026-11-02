'use client'

import Link from 'next/link'
import { ArrowRight, Download, Mail } from 'lucide-react'

const GithubIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
const LinkedinIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
const TwitterIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
const YoutubeIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
import { HeroSceneWrapper } from '@/components/public/3d/HeroSceneWrapper'

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center pt-16 overflow-hidden">
      {/* 3D Background */}
      <HeroSceneWrapper />

      {/* Content Overlay */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-sm font-semibold tracking-widest text-cyan-500 uppercase">
            Hello, I&apos;m
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Nitin Singh
          </h1>
          <h2 className="text-xl font-medium text-zinc-400 sm:text-2xl mt-4">
            AI/ML Student <span className="text-zinc-600 px-2">•</span> Full-Stack Developer
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
            &quot;Building intelligent, real-time and interactive web experiences.&quot;
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150 fill-mode-forwards opacity-0">
          <Link 
            href="/#projects" 
            className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a 
            href="/resume.pdf" // Default fallback, we will wire dynamic resume later
            download
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white border border-zinc-800 shadow-sm hover:bg-zinc-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Download CV <Download className="ml-2 h-4 w-4" />
          </a>
          <a 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center rounded-full bg-transparent px-6 py-3 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
          >
            Let&apos;s Connect <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-forwards opacity-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            <GithubIcon className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <LinkedinIcon className="h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <span className="sr-only">X</span>
            <TwitterIcon className="h-6 w-6" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <span className="sr-only">YouTube</span>
            <YoutubeIcon className="h-6 w-6" />
          </a>
          <a href="mailto:contact@example.com" className="text-zinc-500 hover:text-white transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
