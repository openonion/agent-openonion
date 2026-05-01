/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia'],
      },
      colors: {
        // Backgrounds (white + light grays).
        paper: {
          DEFAULT: '#FFFFFF',
          soft:    '#FAFAFA',
          muted:   '#F4F4F5',
          deep:    '#E4E4E7',
        },
        // Borders / rules.
        line: {
          DEFAULT: '#E4E4E7',
          soft:    '#F4F4F5',
          strong:  '#D4D4D8',
        },
        // Text — kept under `ink` so existing `text-ink` etc. keep working.
        ink: {
          DEFAULT: '#0A0A0A',
          soft:    '#18181B',
          muted:   '#52525B',
          dim:     '#71717A',
          faint:   '#A1A1AA',
        },
        // Accent (green) — same hue across themes; values tuned for light bg.
        accent: {
          DEFAULT: '#16A34A',
          soft:    '#15803D',
          glow:    '#16A34A',
          deep:    '#14532D',
          tint:    '#DCFCE7',
        },
      },
      maxWidth: {
        container: '76rem',
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        display: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        h1: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
