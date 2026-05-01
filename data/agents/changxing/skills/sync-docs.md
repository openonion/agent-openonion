# Sync Documentation

Sync all documentation markdown files from the main ConnectOnion repo to the docs-site public folder.

## Overview

This skill automates the process of copying markdown documentation from `connectonion/docs/` to `docs-site/public/`, ensuring the documentation website always has the latest content.

## Path Mappings

The skill syncs docs maintaining the same directory structure with underscore → hyphen conversion:

- `connectonion/docs/useful_plugins/*.md` → `docs-site/public/useful-plugins/*.md`
- `connectonion/docs/useful_tools/*.md` → `docs-site/public/useful-tools/*.md`
- `connectonion/docs/network/*.md` → `docs-site/public/network/*.md`
- `connectonion/docs/concepts/*.md` → `docs-site/public/concepts/*.md`
- `connectonion/docs/features/*.md` → `docs-site/public/features/*.md`
- `connectonion/docs/cli/*.md` → `docs-site/public/cli/*.md`
- `connectonion/docs/debug/*.md` → `docs-site/public/debug/*.md`
- `connectonion/docs/integrations/*.md` → `docs-site/public/integrations/*.md`
- `connectonion/docs/tui/*.md` → `docs-site/public/tui/*.md`

## What It Does

1. Creates necessary directories in `docs-site/public/`
2. Syncs markdown files with proper path mappings
3. Excludes README.md files (only for repo navigation, not docs)
4. Shows sync summary
5. Auto-commits changes in docs-site repo

## Instructions

You are a documentation sync agent. When invoked, follow these steps:

1. **Verify Paths**
   - Check that both repos exist:
     - Main: `/Users/changxing/project/OnCourse/platform/connectonion/docs/`
     - Docs: `/Users/changxing/project/OnCourse/platform/docs-site/public/`

2. **Create Directories**
   ```bash
   cd /Users/changxing/project/OnCourse/platform/docs-site/public
   mkdir -p useful-plugins useful-tools network concepts features cli debug integrations tui
   ```

3. **Sync Files with Path Mapping**

   For each section, use rsync to sync markdown files (excluding README.md):

   ```bash
   # useful_plugins → useful-plugins
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/useful_plugins/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/useful-plugins/

   # useful_tools → useful-tools
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/useful_tools/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/useful-tools/

   # concepts → concepts
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/concepts/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/concepts/

   # features → features
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/features/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/features/

   # cli → cli
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/cli/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/cli/

   # debug → debug
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/debug/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/debug/

   # integrations → integrations
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/integrations/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/integrations/

   # tui → tui
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/tui/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/tui/

   # network → network
   rsync -av --delete --exclude='README.md' \
     /Users/changxing/project/OnCourse/platform/connectonion/docs/network/ \
     /Users/changxing/project/OnCourse/platform/docs-site/public/network/
   ```

4. **Show Summary**
   ```bash
   echo "=== Sync Complete ==="
   echo ""
   echo "Files synced:"
   find /Users/changxing/project/OnCourse/platform/docs-site/public -name "*.md" -type f | wc -l
   echo ""
   echo "Changes:"
   cd /Users/changxing/project/OnCourse/platform/docs-site
   git status --short
   ```

5. **Auto-Commit**
   ```bash
   cd /Users/changxing/project/OnCourse/platform/docs-site
   git add public/
   git commit -m "Sync documentation from main repo"
   ```

## Usage

Simply invoke the skill:
```
/sync-docs
```

The skill will sync all documentation and commit the changes.

## Notes

- Uses `rsync -av --delete` for efficient syncing (only copies changed files, deletes removed files)
- Excludes README.md files (they're for repo navigation, not docs)
- Maintains same directory structure between repos
- Path mappings handle underscore → hyphen conversions (useful_plugins → useful-plugins)
- Auto-commits changes in docs-site repo (not main repo)
