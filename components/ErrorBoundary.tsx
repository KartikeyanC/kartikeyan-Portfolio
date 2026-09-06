"use client";

import { Component, type ReactNode } from "react";

/**
 * Minimal error boundary so a failure inside the lazy 3D canvas (WebGL
 * unavailable, asset error, etc.) degrades to a static fallback instead
 * of taking down the whole page.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow: the 3D centerpiece is decorative; the fallback is enough.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
