import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 120000 });
}

async function fetchVideoUrl(openai: OpenAI, videoId: string) {
  const content = await openai.videos.downloadContent(videoId);
  const buffer = await content.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:video/mp4;base64,${base64}`;
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    const details: Record<string, unknown> = {
      name: error.name,
      message: error.message,
    };

    if ('stack' in error && typeof error.stack === 'string') {
      details.stack = error.stack;
    }

    const anyError = error as any;
    if (anyError.response) {
      details.response = anyError.response;
    }
    if (anyError.code) {
      details.code = anyError.code;
    }
    if (anyError.type) {
      details.type = anyError.type;
    }

    if (anyError.status) {
      details.status = anyError.status;
    }

    return details;
  }

  return { error };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, duration = 8 } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const seconds = [4, 8, 12].includes(duration)
      ? duration
      : Math.min(12, Math.max(4, Math.round(duration / 4) * 4));

    const openai = getOpenAI();
    const video = await openai.videos.create({
      prompt,
      model: 'sora-2',
      seconds,
      size: '1280x720',
    });

    if (video.error) {
      return NextResponse.json(
        { error: video.error.message || 'Video generation failed', errorCode: video.error.code || null },
        { status: 500 }
      );
    }

    let videoUrl: string | null = null;
    if (video.status === 'completed') {
      videoUrl = await fetchVideoUrl(openai, video.id);
    }

    return NextResponse.json({
      message: 'Video generation started',
      videoId: video.id,
      status: video.status,
      videoUrl,
      prompt,
      duration: seconds,
    });
  } catch (error) {
    const normalized = normalizeError(error);
    console.error('Video generation error:', normalized);
    return NextResponse.json(
      {
        error: normalized.message || 'Failed to generate video',
        errorType: normalized.type || normalized.name || 'UnknownError',
        errorCode: normalized.code || null,
        errorDetails: normalized.response ?? normalized.stack ?? null,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('videoId');
  const probe = request.nextUrl.searchParams.get('probe');

  if (probe === '1') {
    try {
      const openai = getOpenAI();
      const models = await openai.models.list();
      return NextResponse.json({ status: 'ok', modelCount: models.data?.length ?? 0 });
    } catch (error) {
      const normalized = normalizeError(error);
      console.error('OpenAI probe error:', normalized);
      return NextResponse.json(
        {
          error: normalized.message || 'Failed to probe OpenAI',
          errorType: normalized.type || normalized.name || 'UnknownError',
          errorCode: normalized.code || null,
          errorDetails: normalized.response ?? normalized.stack ?? null,
        },
        { status: 500 }
      );
    }
  }

  if (!videoId) {
    return NextResponse.json({
      message: 'Video generation API',
      method: 'POST',
      description: 'Generate videos from text prompts',
    });
  }

  try {
    const openai = getOpenAI();
    const video = await openai.videos.retrieve(videoId);

    if (video.error) {
      return NextResponse.json(
        { error: video.error.message || 'Unable to retrieve video status' },
        { status: 500 }
      );
    }

    let videoUrl: string | null = null;
    if (video.status === 'completed') {
      videoUrl = await fetchVideoUrl(openai, video.id);
    }

    return NextResponse.json({
      videoId: video.id,
      status: video.status,
      videoUrl,
      prompt: video.prompt,
      duration: video.seconds,
    });
  } catch (error) {
    const normalized = normalizeError(error);
    console.error('Video status error:', normalized);
    return NextResponse.json(
      {
        error: normalized.message || 'Failed to retrieve video status',
        errorType: normalized.type || normalized.name || 'UnknownError',
        errorCode: normalized.code || null,
        errorDetails: normalized.response ?? normalized.stack ?? null,
      },
      { status: 500 }
    );
  }
}
