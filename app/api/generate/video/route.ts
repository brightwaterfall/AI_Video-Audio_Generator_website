import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL ?? 'https://api.openai.com/v1';

function requireOpenAIKey() {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }
}

function buildOpenAIUrl(path: string) {
  const trimmedBase = OPENAI_API_BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${trimmedBase}${path}` : `${trimmedBase}/${path}`;
}

async function parseOpenAIError(response: Response) {
  const errorBody = await response.text();
  try {
    const json = JSON.parse(errorBody);
    return json;
  } catch {
    return errorBody;
  }
}

async function openAIJsonRequest(path: string, method: string, body?: unknown) {
  requireOpenAIKey();

  const response = await fetch(buildOpenAIUrl(path), {
    method,
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await response.text();
  const json = payload ? JSON.parse(payload) : null;

  if (!response.ok) {
    const errorPayload = json ?? payload;
    throw new Error(
      `OpenAI request failed (${response.status}): ${JSON.stringify(errorPayload)}`,
    );
  }

  return json;
}

async function openAIGetRequest(path: string) {
  requireOpenAIKey();

  const response = await fetch(buildOpenAIUrl(path), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      Accept: 'application/json',
    },
  });

  const payload = await response.text();
  const json = payload ? JSON.parse(payload) : null;

  if (!response.ok) {
    const errorPayload = json ?? payload;
    throw new Error(
      `OpenAI request failed (${response.status}): ${JSON.stringify(errorPayload)}`,
    );
  }

  return json;
}

async function fetchVideoUrl(videoId: string) {
  requireOpenAIKey();

  const response = await fetch(buildOpenAIUrl(`/videos/${videoId}/content`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      Accept: 'application/octet-stream',
    },
  });

  if (!response.ok) {
    const errorPayload = await parseOpenAIError(response);
    throw new Error(
      `OpenAI video content request failed (${response.status}): ${JSON.stringify(errorPayload)}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  return `data:video/mp4;base64,${buffer.toString('base64')}`;
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
        { status: 400 },
      );
    }

    const seconds = [4, 8, 12].includes(duration)
      ? duration
      : Math.min(12, Math.max(4, Math.round(duration / 4) * 4));

    const video = await openAIJsonRequest('/videos', 'POST', {
      prompt,
      model: 'sora-2',
      seconds,
      size: '1280x720',
    });

    let videoUrl: string | null = null;
    if (video.status === 'completed') {
      videoUrl = await fetchVideoUrl(video.id);
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
        errorType: normalized.name || normalized.type || 'UnknownError',
        errorDetails: normalized.response ?? normalized.stack ?? null,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('videoId');
  const probe = request.nextUrl.searchParams.get('probe');

  if (probe === '1') {
    try {
      const models = await openAIGetRequest('/models');
      return NextResponse.json({ status: 'ok', modelCount: models?.data?.length ?? 0 });
    } catch (error) {
      const normalized = normalizeError(error);
      console.error('OpenAI probe error:', normalized);
      return NextResponse.json(
        {
          error: normalized.message || 'Failed to probe OpenAI',
          errorType: normalized.name || normalized.type || 'UnknownError',
          errorDetails: normalized.response ?? normalized.stack ?? null,
        },
        { status: 500 },
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
    const video = await openAIGetRequest(`/videos/${videoId}`);

    let videoUrl: string | null = null;
    if (video.status === 'completed') {
      videoUrl = await fetchVideoUrl(video.id);
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
        errorType: normalized.name || normalized.type || 'UnknownError',
        errorDetails: normalized.response ?? normalized.stack ?? null,
      },
      { status: 500 },
    );
  }
}
