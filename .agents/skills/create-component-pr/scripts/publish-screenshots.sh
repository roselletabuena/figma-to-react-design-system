#!/usr/bin/env bash
# Publish screenshot PNGs to the `pr-assets` branch so a PR description can embed them.
#
# GitHub's CLI cannot attach images to a PR body, so the images are committed to a separate
# `pr-assets` branch (kept out of the PR diff) and linked by commit SHA.
#
# Usage: publish-screenshots.sh <screenshots-dir> <dest-dir> [remote]
#   <screenshots-dir>  folder holding the *.png files
#   <dest-dir>         folder inside pr-assets, e.g. avatar/3f2a9c1
#   [remote]           defaults to origin
#
# Optional: COMMIT_TRAILER="Co-Authored-By: ..." adds an attribution line to the commit.
# Prints one "<file> <image-url>" line per image.
set -euo pipefail

SRC=${1:?screenshots dir required}
DEST=${2:?destination dir required}
REMOTE=${3:-origin}
BRANCH=pr-assets

ROOT=$(git rev-parse --show-toplevel)
TMP=$(mktemp -d)
CREATED=0

cleanup() {
  git -C "$ROOT" worktree remove --force "$TMP" >/dev/null 2>&1 || true
  rm -rf "$TMP"
  # The local branch only exists to build the commit; the remote branch is the source of truth.
  if [ "$CREATED" = 1 ]; then git -C "$ROOT" branch -D "$BRANCH" >/dev/null 2>&1 || true; fi
}
trap cleanup EXIT

shopt -s nullglob
PNGS=("$SRC"/*.png)
[ ${#PNGS[@]} -gt 0 ] || { echo "No .png files in $SRC" >&2; exit 1; }

if git -C "$ROOT" fetch --quiet "$REMOTE" "$BRANCH" 2>/dev/null; then
  git -C "$ROOT" worktree add --quiet --detach "$TMP" FETCH_HEAD
else
  git -C "$ROOT" worktree add --quiet --orphan -b "$BRANCH" "$TMP"
  CREATED=1
fi

mkdir -p "$TMP/$DEST"
cp "${PNGS[@]}" "$TMP/$DEST/"
git -C "$TMP" add "$DEST"
if git -C "$TMP" diff --cached --quiet; then
  echo "Nothing new to publish; images already match $BRANCH." >&2
else
  git -C "$TMP" commit --quiet -m "chore: add screenshots for $DEST" ${COMMIT_TRAILER:+-m "$COMMIT_TRAILER"}
  git -C "$TMP" push --quiet "$REMOTE" "HEAD:refs/heads/$BRANCH"
fi

SHA=$(git -C "$TMP" rev-parse HEAD)
URL=$(git -C "$ROOT" remote get-url "$REMOTE" 2>/dev/null || echo "$REMOTE")
# https://github.com/owner/repo(.git) or git@github.com:owner/repo(.git) -> owner/repo
SLUG=$(echo "$URL" | sed -E 's#^(https://github\.com/|git@github\.com:)##; s#\.git$##')

for f in "${PNGS[@]}"; do
  name=$(basename "$f")
  echo "$name https://github.com/$SLUG/blob/$SHA/$DEST/$name?raw=true"
done
