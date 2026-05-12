import type { Film } from '../types/film.types'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

interface FilmCardProps {
  film: Film
}

export function FilmCard({ film }: FilmCardProps) {
  const poster = film.posterPath
    ? `${IMG_BASE}${film.posterPath}`
    : '/placeholder-film.png'

  return (
    <article
      style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = 'var(--shadow-glow-primary)'
        el.style.borderColor = 'var(--color-films)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.borderColor = 'var(--color-border)'
      }}
    >
      <img
        src={poster}
        alt={film.title}
        style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
      />
      <div style={{ padding: 'var(--space-4)' }}>
        <h3 style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-1)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {film.title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {film.releaseDate?.slice(0, 4)}
          </span>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-films)',
            fontWeight: 'var(--font-semibold)',
          }}>
            ⭐ {film.voteAverage.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  )
}