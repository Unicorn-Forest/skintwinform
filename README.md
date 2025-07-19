# ⚡ Bolt

<div align="center">
  <img src="./public/logo-light.png" alt="Bolt Logo" width="200" />
  
  **An AI-powered coding assistant that runs in your browser**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18.18.0+-green.svg)](https://nodejs.org/)
  [![Remix](https://img.shields.io/badge/Remix-2.x-blue.svg)](https://remix.run/)
</div>

## 🌟 What is Bolt?

Bolt is an advanced AI coding assistant that combines the power of multiple AI providers with an in-browser development environment. Built by StackBlitz, Bolt enables you to chat with AI, generate code, run applications, and deploy projects—all within your browser.

### ✨ Key Features

- 🤖 **Multi-AI Provider Support**: Works with OpenAI, Anthropic, Google, Ollama, and many more
- 🌐 **In-Browser Runtime**: Powered by WebContainer for full Node.js environment in the browser
- 📝 **Intelligent Code Generation**: Create, edit, and refactor code with AI assistance
- 🖥️ **Integrated Terminal**: Full shell access with zsh emulation
- 📁 **File System Management**: Create, edit, and organize project files
- 👀 **Live Preview**: See your applications running in real-time
- 🔄 **Git Integration**: Version control and repository management
- 🚀 **Multiple Deployment Options**: Deploy to Netlify, Vercel, and other platforms
- 💻 **Cross-Platform**: Available as web app and Electron desktop application
- 🐳 **Docker Ready**: Containerized deployment support
- 🧪 **SkinTwin Formulation Vessel**: Specialized AI assistant for skincare product formulation with chemical reaction simulation

### 🧪 SkinTwin Virtual Turbo Reactor Formulation Vessel

A specialized prompt that transforms the AI assistant into a virtual chemical reaction vessel for skincare formulation:

- **Virtual Chemistry**: Simulates real chemical reactions as ingredients are added
- **Safety First**: Only recommends cosmetically safe ingredients, avoids restricted chemicals
- **Professional Output**: Industry-standard ingredient tables with INCI names and ZAR pricing
- **Step-by-Step Mixing**: Detailed formulation instructions with chemical equations
- **Product Development**: Suggests creative product names and functional benefits

To use: Select "SkinTwin Formulation Vessel" from the prompt dropdown in settings, then try examples like "Create a vitamin C brightening serum" or "Formulate an anti-aging night cream with retinol".

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0 or higher
- pnpm (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EchoCog/bolt.ceo.git
   cd bolt.ceo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys (see [Environment Setup](#environment-setup) below).

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to start using Bolt!

## 🔧 Environment Setup

Bolt supports multiple AI providers. You only need to configure the providers you want to use:

### Required for Development
```bash
# For debugging (optional)
VITE_LOG_LEVEL=debug
```

### AI Provider Configuration

Choose one or more providers and add their API keys:

#### OpenAI
```bash
OPENAI_API_KEY=your_openai_api_key_here
```
[Get your OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

#### Anthropic (Claude)
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```
[Get your Anthropic API key](https://console.anthropic.com/settings/keys)

#### Google Gemini
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```
[Get your Google API key](https://console.cloud.google.com/apis/credentials)

#### Ollama (Local AI)
```bash
OLLAMA_API_BASE_URL=http://127.0.0.1:11434
```

#### Other Supported Providers
- **Groq**: `GROQ_API_KEY`
- **HuggingFace**: `HuggingFace_API_KEY`
- **OpenRouter**: `OPEN_ROUTER_API_KEY`
- **Mistral**: `MISTRAL_API_KEY`
- **Cohere**: `COHERE_API_KEY`
- **DeepSeek**: `DEEPSEEK_API_KEY`
- **Together AI**: `TOGETHER_API_KEY`
- **xAI**: `XAI_API_KEY`
- **Perplexity**: `PERPLEXITY_API_KEY`

### GitHub Integration (Optional)
```bash
VITE_GITHUB_ACCESS_TOKEN=your_github_token_here
VITE_GITHUB_TOKEN_TYPE=classic
```
[Create a GitHub Personal Access Token](https://github.com/settings/tokens)

### AWS Bedrock (Optional)
```bash
AWS_BEDROCK_CONFIG={"region": "us-east-1", "accessKeyId": "your_key", "secretAccessKey": "your_secret"}
```

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Type checking

### Project Structure

```
bolt.ceo/
├── app/                    # Remix application code
│   ├── components/         # React components
│   ├── lib/               # Core libraries and utilities
│   ├── routes/            # Remix routes
│   └── styles/            # Styling files
├── electron/              # Electron app configuration
├── public/                # Static assets
├── docs/                  # Documentation
└── scripts/               # Build and utility scripts
```

### Technology Stack

- **Framework**: [Remix](https://remix.run/) with [Vite](https://vitejs.dev/)
- **Runtime**: [WebContainer](https://webcontainer.dev/) for in-browser Node.js
- **Styling**: [UnoCSS](https://unocss.dev/) with Tailwind CSS
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **AI Integration**: [AI SDK](https://sdk.vercel.ai/)
- **State Management**: [Nanostores](https://github.com/nanostores/nanostores)
- **Desktop App**: [Electron](https://www.electronjs.org/)

## 🐳 Docker Deployment

### Development
```bash
pnpm dockerbuild
pnpm dockerrun
```

### Production
```bash
pnpm dockerbuild:prod
docker run -p 5173:5173 --env-file .env.local bolt-ai:production
```

## 📱 Electron Desktop App

Build desktop applications for different platforms:

```bash
# Build for current platform
pnpm electron:build:unpack

# Build for specific platforms
pnpm electron:build:mac     # macOS
pnpm electron:build:win     # Windows
pnpm electron:build:linux   # Linux

# Build for all platforms
pnpm electron:build:dist
```

## 🌐 Cloud Deployment

### Cloudflare Pages
```bash
pnpm deploy
```

### Custom Deployment
1. Build the project: `pnpm build`
2. Deploy the `build/client` directory to your hosting provider
3. Ensure environment variables are configured in your hosting platform

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm typecheck
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all linting checks pass: `pnpm lint`
- Run type checking: `pnpm typecheck`

## 📚 Documentation

For more detailed documentation, visit the [docs](./docs/) directory. Additional documentation is being actively developed.

## 🐛 Issues and Support

If you encounter any issues or have questions:

1. Check the [existing issues](https://github.com/EchoCog/bolt.ceo/issues)
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the [StackBlitz](https://stackblitz.com/) team
- Powered by [WebContainer](https://webcontainer.dev/) technology
- Community contributions from [bolt.diy](https://bolt.diy/)

---

<div align="center">
  <p>Made with ⚡ by the Bolt team</p>
  <p>
    <a href="https://bolt.ceo">Website</a> •
    <a href="https://github.com/EchoCog/bolt.ceo/issues">Issues</a> •
    <a href="https://github.com/EchoCog/bolt.ceo/discussions">Discussions</a>
  </p>
</div>
