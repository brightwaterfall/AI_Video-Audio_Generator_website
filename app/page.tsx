'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          🎬 AI Creator Studio
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning videos, generate realistic audio, and transcribe voices using cutting-edge AI technology
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/generate/video"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
          >
            🎥 Generate Video
          </Link>
          <Link
            href="/generate/audio"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
          >
            🎵 Generate Audio
          </Link>
          <Link
            href="/transcribe"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
          >
            📝 Transcribe Audio
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Features
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Video Generation */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-4">Video Generation</h3>
            <p className="text-gray-300 mb-4">
              Transform your ideas into stunning videos with AI-powered video generation
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Text-to-video conversion</li>
              <li>✓ Custom duration control</li>
              <li>✓ Multiple generation styles</li>
            </ul>
          </div>

          {/* Audio Generation */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-white mb-4">Audio Generation</h3>
            <p className="text-gray-300 mb-4">
              Convert text to natural-sounding speech with multiple voice options
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Multiple voice options</li>
              <li>✓ Adjustable speaking speed</li>
              <li>✓ High-quality audio output</li>
            </ul>
          </div>

          {/* Transcription */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-4">Audio Transcription</h3>
            <p className="text-gray-300 mb-4">
              Convert audio files to accurate text transcriptions instantly
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Auto language detection</li>
              <li>✓ Multiple language support</li>
              <li>✓ High accuracy transcription</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-white font-bold mb-2">Input Your Content</h3>
            <p className="text-gray-300 text-sm">
              Provide your text, prompt, or audio file
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-white font-bold mb-2">Process with AI</h3>
            <p className="text-gray-300 text-sm">
              Our AI models process your request
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-white font-bold mb-2">Generate Output</h3>
            <p className="text-gray-300 text-sm">
              Get your video, audio, or transcription
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              4
            </div>
            <h3 className="text-white font-bold mb-2">Download & Share</h3>
            <p className="text-gray-300 text-sm">
              Download and share your creation
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-black bg-opacity-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>&copy; 2024 AI Creator Studio. Powered by OpenAI APIs.</p>
        </div>
      </footer>
    </div>
  );
}
