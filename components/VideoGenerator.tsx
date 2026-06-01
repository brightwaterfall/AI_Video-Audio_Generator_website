'use client';

import { useEffect, useState } from 'react';

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [pollAttempts, setPollAttempts] = useState(0);

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setVideoUrl(null);
    setVideoStatus(null);
    setVideoId(null);
    setPollAttempts(0);

    try {
      const response = await fetch('/api/generate/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, duration }),
      });

      const data = await response.json();
      if (!response.ok) {
        const details = data?.errorDetails ? JSON.stringify(data.errorDetails, null, 2) : null;
        setError(data?.error || 'Failed to generate video');
        setErrorDetails(details);
        throw new Error(data?.error || 'Failed to generate video');
      }

      setVideoId(data?.videoId || null);
      setVideoStatus(data?.status || null);
      setMessage(data?.message || 'Video generation started.');
      setVideoUrl(data?.videoUrl || null);
      setErrorDetails(null);
      if (data?.status && data.status !== 'completed' && !data?.videoUrl) {
        setMessage('Video generation started. This may take a while; the app will check status automatically.');
      }
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshVideoStatus = async () => {
    if (!videoId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/generate/video?videoId=${encodeURIComponent(videoId)}`);
      const data = await response.json();

      if (!response.ok) {
        const details = data?.errorDetails ? JSON.stringify(data.errorDetails, null, 2) : null;
        setError(data?.error || 'Failed to fetch video status');
        setErrorDetails(details);
        throw new Error(data?.error || 'Failed to fetch video status');
      }

      setVideoStatus(data?.status || null);
      setVideoUrl(data?.videoUrl || null);
      setErrorDetails(null);
      if (data?.videoUrl) {
        setMessage('Video generation completed!');
      } else {
        setMessage(`Video is still ${data?.status}.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!videoId || videoStatus === 'completed' || videoUrl || pollAttempts >= 10) {
      return;
    }

    const timer = window.setTimeout(async () => {
      await refreshVideoStatus();
      setPollAttempts((attempts) => attempts + 1);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [videoId, videoStatus, videoUrl, pollAttempts]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Video Generator
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          <strong>Note:</strong> Video generation requires integration with a video generation service
          (such as OpenAI&apos;s video model, Replicate, or Runway). Configure your preferred service
          in the API route.
        </p>
      </div>

      <form onSubmit={handleGenerateVideo} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to create in detail..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (seconds): {duration}
          </label>
          <div className="flex items-center gap-4 mb-2">
            {[4, 8, 12].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDuration(value)}
                className={`px-4 py-2 rounded-lg border ${duration === value ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                {value}s
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            {errorDetails && (
              <pre className="mt-3 whitespace-pre-wrap text-xs text-gray-700 bg-white border border-gray-200 rounded p-3 overflow-x-auto">
                {errorDetails}
              </pre>
            )}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
            {videoStatus && (
              <p className="mt-2 text-sm text-gray-700">Status: {videoStatus}</p>
            )}
            {videoId && (
              <p className="mt-1 text-sm text-gray-700">Job ID: {videoId}</p>
            )}
            {videoId && videoStatus && videoStatus !== 'completed' && (
              <button
                type="button"
                onClick={refreshVideoStatus}
                disabled={loading}
                className="mt-3 inline-flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
              >
                Refresh Status
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !prompt}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? 'Submitting...' : 'Generate Video'}
        </button>
      </form>

      {videoUrl && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Generated Video</h2>
          <video controls className="w-full rounded-lg" src={videoUrl} />
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            download="generated-video.mp4"
            className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Download Video
          </a>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Features</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Generate videos from text prompts</li>
          <li>✓ Customize video duration</li>
          <li>✓ Track generation status in dashboard</li>
          <li>✓ Download completed videos</li>
        </ul>
      </div>
    </div>
  );
}
