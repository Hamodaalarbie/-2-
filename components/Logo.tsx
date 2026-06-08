'use client'

type Scheme = 'default' | 'admin' | 'investor' | 'partner' | 'featured'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  scheme?: Scheme
  showEn?: boolean
}

// Bumped sizes: sm renders md-size icon, md renders lg-size icon
const ICON_SIZES = { sm: 38, md: 56, lg: 72 }
const AR_TEXT = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-5xl' }
const EN_TEXT = { sm: 'text-[10px]', md: 'text-sm', lg: 'text-base' }

function colors(scheme: Scheme): [string, string] {
  switch (scheme) {
    case 'admin':
      return ['#e91e8c', '#c2185b']
    case 'featured':
      return ['#ff2d55', '#ff9500']
    default:
      return ['#1e90ff', '#00c6ff']
  }
}

export function Logo({ size = 'md', scheme = 'default', showEn = true }: LogoProps) {
  const s = ICON_SIZES[size]
  const [a, b] = colors(scheme)
  const uid = `${scheme}-${size}`

  return (
    <div className="flex items-center gap-2.5">
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`hex-${uid}`} x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
          <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M24 2.5 43 13.25v21.5L24 45.5 5 34.75v-21.5z"
          stroke={`url(#hex-${uid})`}
          strokeWidth="2.5"
          fill={`url(#hex-${uid})`}
          fillOpacity="0.12"
          filter={`url(#glow-${uid})`}
        />
        {/* realistic lightning bolt with branches */}
        <g filter={`url(#glow-${uid})`} fill={`url(#hex-${uid})`}>
          <path d="M27 11 16.5 25.5h6.2l-1.8 5.5 4.6-6.2-4.3.2z" />
          <path d="M25.6 24 31.5 16l-3 9.6 4.5-1L23 37l3.4-9.4z" />
          <path d="M22 30.5l-2.4 6.5 4-4.6z" opacity="0.85" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold italic ${AR_TEXT[size]}`}
          style={{ fontFamily: 'var(--font-arabic)' }}
        >
          <span style={{ color: a }}>عرب</span>
          <span style={{ color: b }}>اوي</span>
        </span>
        {showEn && (
          <span className={`mt-0.5 font-bold tracking-[0.25em] ${EN_TEXT[size]}`}>
            <span style={{ color: a }}>ARAB</span>
            <span style={{ color: b }}>AAWY</span>
          </span>
        )}
      </div>
    </div>
  )
}
export default Logo