---
name: make-poster
description: Generate a Bauhaus/Swiss style graphic art poster (no title). Pure visual background art for use as a cover base image or standalone poster.
argument-hint: "<topic>"
allowed-tools: Bash, Read
---

# Poster Generator

Generates geometric Bauhaus/Swiss style art using `gemini-3.1-flash-image-preview`. No text, no title — pure graphic background.

## Usage

```bash
python /Users/changxing/project/OnCourse/platform/one-person-company-skills/make-cover/scripts/make_poster.py "<topic>" -o output
```

## Workflow

1. Run the script with a descriptive topic
2. Read the output image to review it
3. Re-run with a different topic if the composition doesn't work — up to 3 attempts
4. Return the saved file path for use with `make-cover`
