const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Acesso ao dev via IP da rede (ex.: celular em http://192.168.0.15:3000)
  allowedDevOrigins: ["192.168.0.15"],
  // Evita que o Next use o pnpm-lock.yaml em ~/ quando existe outro neste projeto
  outputFileTracingRoot: path.join(__dirname),
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb"
    }
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
    prependData: `
    @use "@/scss/base/typography.scss" as *;
    @use "@/scss/base/responsives.scss" as *;
    @use "@/scss/theme/colors.scss" as *;
    @use "@/scss/theme/spacing.scss" as *;
    @use "@/scss/theme/animations.scss" as *;
    @use "@/scss/mixin.scss" as *;`
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ],
    qualities: [25, 50, 75, 100]
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply these headers to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "cross-origin"
          }
        ]
      }
    ];
  },

};

module.exports = nextConfig;