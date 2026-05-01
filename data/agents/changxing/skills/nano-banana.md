---
name: nano-banana
description: Generate images using Google Nano Banana (Imagen 4). Use when the user wants to create, generate, or produce images using AI.
argument-hint: "<image description> [-m imagen-fast|imagen|imagen-ultra|gemini-flash] [-n 1-4] [-a 1:1|16:9|...]"
disable-model-invocation: true
allowed-tools: Bash
---

# Nano Banana - Google AI Image Generator

Generate images from a text description using Google's Imagen 4 model.

## Setup (first time)

Check dependencies are installed:

```bash
pip install google-genai Pillow python-dotenv
```

Check API key is set (get one at https://aistudio.google.com/apikey):

```bash
echo ${GEMINI_API_KEY:-"NOT SET - add GEMINI_API_KEY to your environment"}
```

## Generate images

Run the script with the user's description (`$ARGUMENTS`):

```bash
python /Users/changxing/project/OnCourse/platform/nano-banana/nano-banana/scripts/generate.py "$ARGUMENTS"
```

Output images are saved to `./output/`. After generating, tell the user the full path and suggest:

```bash
open output/image_1.png
```

## Model options

Pass extra flags to customize:

| Flag | Model | Price | When to use |
|------|-------|-------|-------------|
| `-m imagen-fast` | Imagen 4 Fast | $0.02/img | Quick drafts |
| `-m imagen` | Imagen 4 | $0.04/img | Default |
| `-m imagen-ultra` | Imagen 4 Ultra | $0.06/img | Best quality |
| `-m gemini-flash` | Gemini 2.5 Flash | ~$0.04/img | Conversational |
| `-n N` | — | — | 1–4 images |
| `-a 16:9` | — | — | Aspect ratio |

Example: `/nano-banana a tropical beach at sunset -m imagen-ultra -n 4 -a 16:9`
