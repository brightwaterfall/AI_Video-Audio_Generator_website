import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'AI Creator API is running',
    endpoints: {
      video: '/api/generate/video',
      audio: '/api/generate/audio',
      transcribe: '/api/transcribe',
    },
  });
}
