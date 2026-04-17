module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/jamiepine/voicebox.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "npm install"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install --upgrade pip",
          "uv pip install -r requirements.txt",
          "uv pip install hume-tada --no-deps",
          "uv pip install chatterbox-tts --no-deps"
        ]
      }
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64' && exists('app/backend/requirements-mlx.txt')}}",
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install --prerelease=allow -r requirements-mlx.txt",
          "uv pip install hume-tada --no-deps",
          "uv pip install chatterbox-tts --no-deps"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install git+https://github.com/QwenLM/Qwen3-TTS.git"
        ]
      }
    },
    {
      when: "{{gpu === 'nvidia' && platform === 'win32' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps"
      }
    }
  ]
}
