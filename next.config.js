/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    const r = [
      {
        source: '/install',
        destination: 'https://raw.githubusercontent.com/openonion/oo/main/install.sh',
        permanent: false,
      },
    ]

    // Alias → address redirects. Aliases aren't routable (addresses are
    // canonical), but typing /changxing should still land on the right
    // profile rather than 404. Fetched from the same directory used by
    // the page routes; failures here just mean no extra redirects ship.
    const OO_API_URL = process.env.OO_API_URL || 'https://oo.openonion.ai'
    const res = await fetch(`${OO_API_URL}/api/relay/directory`).catch(() => null)
    if (!res || !res.ok) return r
    const data = await res.json().catch(() => null)
    for (const a of data?.agents || []) {
      const alias = a?.alias
      const address = a?.address
      if (!alias || !address) continue
      r.push(
        { source: `/${alias}`,       permanent: true, destination: `/${address}` },
        { source: `/${alias}/:item`, permanent: true, destination: `/${address}/:item` },
      )
    }
    return r
  },
}

module.exports = nextConfig
