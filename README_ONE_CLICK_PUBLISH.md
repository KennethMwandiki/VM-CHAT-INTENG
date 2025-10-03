# One-Click Publish — Setup Guide

This document explains how to configure CI to automatically build and publish to multiple stores when changes are pushed to `main`.

## Required Secrets (GitHub repository secrets)
- `DOCKER_REGISTRY` — Docker registry URL (e.g., ghcr.io/yourorg)
- `DOCKER_USERNAME` — Docker registry username
- `DOCKER_PASSWORD` — Docker registry password
- `VERCEL_TOKEN` — Vercel token for web publishing
- `GOOGLE_PLAY_JSON_KEY` — Google Play JSON key (base64 or file upload)
- `APP_STORE_CONNECT_API_KEY` — App Store Connect API key

## Files
- `.github/workflows/one-click-publish.yml` — CI workflow that builds and publishes
- `scripts/publish-web.sh` — Script to publish web build (Vercel by default)
- `scripts/publish-android.sh` — Script to trigger Fastlane Android release
- `scripts/publish-ios.sh` — Script to trigger Fastlane iOS release (macOS runners required)
- `scripts/publish-desktop.sh` — Placeholder for desktop publish commands

## How it works
1. Push to `main` triggers the workflow.
2. Workflow builds frontend and backend artifacts.
3. Artifacts are uploaded or published using provider CLIs (Vercel, Fastlane, etc.).

## Notes & Next Steps
- iOS publishing requires macOS runners or an external service (e.g., Bitrise).
- Configure Fastlane lanes in `android/fastlane` and `ios/fastlane` before enabling mobile publishing.
- For Microsoft Store or other desktop stores, add provider-specific CLI steps to `scripts/publish-desktop.sh`.

## Enable / Disable Publish Targets
You can enable or disable specific publish targets by editing `.github/workflows/one-click-publish.yml` environment variables or by setting repository-level environment variables.

- To disable iOS publishing, set `PUBLISH_IOS` to `false` in the workflow or in repository secrets/env.
- To disable Android publishing, set `PUBLISH_ANDROID` to `false`.
- To disable web publishing, set `PUBLISH_WEB` to `false`.
- To disable desktop publishing, set `PUBLISH_DESKTOP` to `false`.

Example (workflow env override):

```yaml
env:
	PUBLISH_WEB: 'true'
	PUBLISH_ANDROID: 'true'
	PUBLISH_IOS: 'false'
	PUBLISH_DESKTOP: 'false'
```

## Slack Notifications
You can enable Slack notifications by adding the `SLACK_WEBHOOK_URL` secret to your repository. The workflow will send a completion message when the pipeline finishes.

Steps:
1. Create an Incoming Webhook in Slack and copy the webhook URL.
2. Add `SLACK_WEBHOOK_URL` as a repository secret.
3. The workflow will post a summary message on completion.

## Manual Release & One-Click Publish
You can manually trigger a release and run the one-click publish from the GitHub UI or via the `gh` CLI.

From the Actions UI:
- Open the `Publish Release and Trigger One-Click` workflow and click `Run workflow`. Provide a `tag` and `release-name` if desired.

From the CLI using `gh`:

```bash
gh workflow run publish-release.yml --repo OWNER/REPO --field tag=v1.0.0 --field release-name="Release 1.0.0"
```

This will create an optional GitHub release and then trigger the `one-click-publish.yml` workflow.
