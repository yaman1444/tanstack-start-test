import { createServerFn } from '@tanstack/react-start/server'
import { z } from 'zod'
import { http } from '../../../core/http/client'
import type { Film, FilmDetail, FilmsResponse } from '../types/film.types'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY!

// ── Mapper TMDB → notre type Film ──
function mapFilm(raw: any): Film {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    releaseDate: raw.release_date,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count,
    genreIds: raw.genre_ids ?? [],
    popularity: raw.popularity,
  }
}

// ── Server Functions (BFF) ──
export const fetchFilms = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      category: z.enum(['popular', 'top_rated', 'upcoming', 'now_playing']).default('popular'),
      page: z.number().default(1),
    })
  )
  .handler(async ({ data }) => {
    const raw = await http.get<any>(`${BASE_URL}/movie/${data.category}`, {
      params: { api_key: API_KEY, page: data.page, language: 'en-US' },
    })

    return {
      items: raw.results.map(mapFilm),
      total: raw.total_results,
      page: raw.page,
      totalPages: raw.total_pages,
    } satisfies FilmsResponse
  })

export const fetchFilmById = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const raw = await http.get<any>(`${BASE_URL}/movie/${data.id}`, {
      params: { api_key: API_KEY, language: 'en-US' },
    })

    return {
      ...mapFilm(raw),
      runtime: raw.runtime,
      genres: raw.genres,
      tagline: raw.tagline,
      status: raw.status,
      budget: raw.budget,
      revenue: raw.revenue,
    } satisfies FilmDetail
  })