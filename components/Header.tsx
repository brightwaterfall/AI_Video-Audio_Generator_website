'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            🎬 AI Creator
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/generate/video" className="hover:text-purple-200 transition">
              Video Generator
            </Link>
            <Link href="/generate/audio" className="hover:text-purple-200 transition">
              Audio Generator
            </Link>
            <Link href="/transcribe" className="hover:text-purple-200 transition">
              Transcriber
            </Link>
            <Link href="/dashboard" className="hover:text-purple-200 transition">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <Link href="/generate/video" className="hover:text-purple-200 transition">
              Video Generator
            </Link>
            <Link href="/generate/audio" className="hover:text-purple-200 transition">
              Audio Generator
            </Link>
            <Link href="/transcribe" className="hover:text-purple-200 transition">
              Transcriber
            </Link>
            <Link href="/dashboard" className="hover:text-purple-200 transition">
              Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
