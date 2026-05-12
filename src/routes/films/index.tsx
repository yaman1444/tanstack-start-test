import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FilmList } from '../../features/films'
import type { FilmCategory } from '../../features/films'

export const Route = createFileRoute('/films/')({
  component: FilmsPage,
})

function FilmsPage() {
  const [category, setCategory] = useState<FilmCategory>('popular')

  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
        }}>
          🎬 Films
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Browse movies powered by TMDB
        </p>
      </div>

      <FilmList category={category} onCategoryChange={setCategory} />
    </main>
  )
}