import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicit root prevents Turbopack misreading the path on Windows
    // when the project directory contains spaces (e.g. "Carl Buckley").
    root: process.cwd(),
  },
};

export default nextConfig;
