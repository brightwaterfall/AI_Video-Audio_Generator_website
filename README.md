# AI Video and Audio Creator Website

A full-stack Next.js application that integrates OpenAI services to create videos, generate realistic audio, and transcribe voice recordings using cutting-edge AI technology.

## Features

- **🎥 Video Generation**: Transform text prompts into stunning videos
- **🎵 Audio Generation (TTS)**: Convert text to natural-sounding speech with multiple voice options
- **📝 Audio Transcription**: Transcribe audio files to text using OpenAI Whisper
- **⚡ Fast & Responsive**: Built with Next.js 14+ and Tailwind CSS
- **🔐 Type-Safe**: Full TypeScript support for better development experience

## Project Structure

```
ai-creator/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   ├── video/route.ts       # Video generation endpoint
│   │   │   └── audio/route.ts       # Audio/TTS endpoint
│   │   ├── transcribe/route.ts      # Audio transcription endpoint
│   │   └── health/route.ts          # Health check endpoint
│   ├── generate/
│   │   ├── video/page.tsx           # Video generator page
│   │   └── audio/page.tsx           # Audio generator page
│   ├── transcribe/page.tsx          # Transcriber page
│   ├── dashboard/page.tsx           # Dashboard page
│   ├── layout.tsx                   # Root layout with Header
│   └── page.tsx                     # Home page
├── components/
│   ├── Header.tsx                   # Navigation header
│   ├── VideoGenerator.tsx           # Video generation component
│   ├── AudioGenerator.tsx           # Audio/TTS component
│   └── Transcriber.tsx              # Transcription component
├── lib/                             # Utility functions
├── public/                          # Static assets
└── .env.example                     # Environment variables template
```

## Tech Stack

- **Frontend**: React, Next.js 14, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes
- **AI Services**: OpenAI API (GPT, Whisper, TTS)
- **Package Manager**: npm

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get it from [openai.com](https://platform.openai.com/api-keys))
- Modern web browser

## Installation

1. **Clone the repository** (or navigate to your project):
   ```bash
   cd ai-creator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

   Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

### Audio Generation (TTS)
- **URL**: `POST /api/generate/audio`
- **Body**:
  ```json
  {
    "text": "Hello, world!",
    "voice": "alloy",
    "speed": 1.0
  }
  ```
- **Available voices**: alloy, echo, fable, onyx, nova, shimmer
- **Speed range**: 0.25 to 4.0

### Audio Transcription (Whisper)
- **URL**: `POST /api/transcribe`
- **Type**: multipart/form-data
- **Parameters**:
  - `audio` (File): Audio file to transcribe
  - `language` (Optional): Language code (e.g., 'en', 'es', 'fr')

### Video Generation
- **URL**: `POST /api/generate/video`
- **Body**:
  ```json
  {
    "prompt": "A beautiful sunset over mountains",
    "duration": 10
  }
  ```

### Health Check
- **URL**: `GET /api/health`
- **Response**: API status and available endpoints

## Pages

- **Home** (`/`): Landing page with features overview
- **Video Generator** (`/generate/video`): Create videos from prompts
- **Audio Generator** (`/generate/audio`): Convert text to speech
- **Transcriber** (`/transcribe`): Transcribe audio files
- **Dashboard** (`/dashboard`): View your creations and usage stats

## Environment Variables

Create a `.env.local` file with the following:

```env
# Required
OPENAI_API_KEY=your_openai_api_key

# NextAuth (for future authentication)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

## Usage Examples

### Generate Audio from Text
```javascript
const response = await fetch('/api/generate/audio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Welcome to AI Creator',
    voice: 'nova',
    speed: 1.0
  })
});
const audioBlob = await response.blob();
```

### Transcribe Audio
```javascript
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('language', 'en');

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData
});
const { text } = await response.json();
```

## Cost Considerations

OpenAI API usage incurs costs. Estimated costs for common operations:
- **TTS (Text-to-Speech)**: ~$0.015 per 1K characters
- **Whisper (Transcription)**: ~$0.006 per minute of audio
- **GPT Models**: Variable based on model and tokens used

Monitor your usage at [OpenAI Usage Dashboard](https://platform.openai.com/account/usage/overview)

## Future Enhancements

- [ ] User authentication with NextAuth.js
- [ ] Database integration for saving user creations
- [ ] Advanced video generation with multiple providers (Replicate, Runway)
- [ ] Batch processing capabilities
- [ ] Video editing and composition tools
- [ ] Advanced transcription features (speaker identification)
- [ ] WebSocket support for real-time generation status
- [ ] Payment integration for commercial use

## Troubleshooting

### "Invalid API Key" Error
- Verify your OpenAI API key is correctly set in `.env.local`
- Ensure the key has proper permissions
- Check that your OpenAI account has available credits

### Audio Not Generating
- Check browser console for detailed error messages
- Verify the text input is not empty
- Ensure your OpenAI account is in good standing

### Transcription Failures
- Verify the audio file format is supported (mp3, wav, m4a, etc.)
- Check file size (max recommended: 25MB)
- Ensure language parameter is valid if specified

## Performance Tips

1. Optimize large audio files before uploading
2. Use appropriate voice and speed settings to reduce processing time
3. Implement caching for repeated operations
4. Monitor API quotas to avoid interruptions

## Security Considerations

- Never commit `.env.local` to version control
- Rotate API keys regularly
- Implement rate limiting for production
- Validate and sanitize all user inputs
- Use HTTPS in production
- Consider adding authentication for production use

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues with:
- **OpenAI API**: [OpenAI Documentation](https://platform.openai.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Changelog

### v1.0.0 (2024)
- Initial release
- Audio generation (TTS) with multiple voices
- Audio transcription (Whisper)
- Video generation framework
- Responsive dashboard
- API health check endpoint

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
