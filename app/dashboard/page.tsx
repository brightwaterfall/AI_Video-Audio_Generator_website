'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Video Generation Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <div className="text-5xl mb-4">🎥</div>
          <h2 className="text-2xl font-bold mb-4">Video Generation</h2>
          <p className="text-gray-600 mb-6">
            Generate videos from text prompts. Track your video generation requests and download completed videos.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> <span className="text-green-600">Ready</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Recent:</strong> No videos yet
            </p>
          </div>
          <Link
            href="/generate/video"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Create Video
          </Link>
        </div>

        {/* Audio Generation Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <div className="text-5xl mb-4">🎵</div>
          <h2 className="text-2xl font-bold mb-4">Audio Generation</h2>
          <p className="text-gray-600 mb-6">
            Convert text to realistic speech. Choose from multiple voices and adjust speaking speed.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> <span className="text-green-600">Ready</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Recent:</strong> No audio yet
            </p>
          </div>
          <Link
            href="/generate/audio"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Audio
          </Link>
        </div>

        {/* Transcription Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-4">Transcription</h2>
          <p className="text-gray-600 mb-6">
            Transcribe audio files to text. Supports multiple languages with high accuracy.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> <span className="text-green-600">Ready</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Recent:</strong> No transcriptions yet
            </p>
          </div>
          <Link
            href="/transcribe"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Transcribe
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
          <div className="text-4xl font-bold">0</div>
          <p className="mt-2">Videos Created</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
          <div className="text-4xl font-bold">0</div>
          <p className="mt-2">Audio Files</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
          <div className="text-4xl font-bold">0</div>
          <p className="mt-2">Transcriptions</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg p-6 text-center">
          <div className="text-4xl font-bold">0</div>
          <p className="mt-2">Total Items</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Getting Started</h3>
        <p className="text-blue-800 mb-4">
          Welcome to AI Creator Studio! To get started, make sure you have:
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-800">
          <li>Set up your OpenAI API key in the environment variables</li>
          <li>Configured your preferred video generation service</li>
          <li>Reviewed the API documentation in the help section</li>
        </ul>
      </div>
    </div>
  );
}
