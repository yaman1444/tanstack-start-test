import { FilmCard } from './FilmCard'
import type { FilmCategory, Film } from '../types/film.types'
import { useFilms } from '../hooks/useFilms'

const CATEGORIES: { label: string; value: FilmCategory }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Now Playing', value: 'now_playing' },
]

interface FilmListProps {
  category: FilmCategory
  onCategoryChange: (c: FilmCategory) => void
}

export function FilmList({ category, onCategoryChange }: FilmListProps) {
  const { data, isLoading, isError } = useFilms(category)

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: category === c.value ? 'var(--color-films)' : 'var(--color-border)',
              background: category === c.value ? 'var(--color-films)' : 'transparent',
              color: category === c.value ? '#000' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* States */}
      {isLoading && (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Loading films...</p>
      )}
      {isError && (
        <p style={{ color: 'var(--color-error)', textAlign: 'center' }}>Failed to load films.</p>
      )}

      {/* Grid */}
      {data && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {data.items.map((film: Film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  )
}