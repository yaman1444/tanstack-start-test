import { useQuery } from '@tanstack/react-query'
import { fetchFilms, fetchFilmById } from '../api/films.server'
import type { FilmCategory } from '../types/film.types'

export const filmKeys = {
  all: ['films'] as const,
  list: (category: FilmCategory, page: number) =>
    [...filmKeys.all, 'list', category, page] as const,
  detail: (id: number) => [...filmKeys.all, 'detail', id] as const,
}

export function useFilms(category: FilmCategory = 'popular', page = 1) {
  return useQuery({
    queryKey: filmKeys.list(category, page),
    queryFn: () => fetchFilms({ data: { category, page } }),
    staleTime: 1000 * 60 * 5, // 5 min
  })
}

export function useFilmById(id: number) {
  return useQuery({
    queryKey: filmKeys.detail(id),
    queryFn: () => fetchFilmById({ data: { id } }),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  })
}