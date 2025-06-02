/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'

import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: { dirs: ['config', 'scripts', 'src'] },
  experimental: { reactCompiler: true },
  images: { deviceSizes: [390, 1024, 1280, 1440, 1600] },
  sassOptions: {
    additionalData: '@use "~/styles/design" as *; @use "~/styles/utils" as *;',
  },
}

export default config
