// This file previously contained JSX and was renamed/converted to PlatformSelectionUI.tsx.
// To maintain compatibility for any imports that reference the .ts file explicitly,
// re-export the compiled module from the .tsx implementation.

// Re-export from the .tsx implementation to avoid circular resolution
// Legacy shim removed — keep this file as a no-op to avoid import resolution issues.
// The real implementation lives in `PlatformSelectionUI.tsx`.
// Re-export the real implementation from the .tsx file so imports that
// resolve to this legacy .ts shim still receive the default and named
// exports. This avoids TS1192 "has no default export" when some imports
// resolve to the .ts file instead of the .tsx implementation.
// Re-export from the implementation (extensionless import) so resolution
// picks the .tsx implementation when available.
export { default, ALL_PLATFORMS } from './PlatformSelectionUI';
