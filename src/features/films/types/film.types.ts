export interface Film {
  id: number
  title: string
  overview: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string
  voteAverage: number
  voteCount: number
  genreIds: number[]
  popularity: number
}

export interface FilmDetail extends Film {
  runtime: number | null
  genres: { id: number; name: string }[]
  tagline: string
  status: string
  budget: number
  revenue: number
}

export interface FilmsResponse {
  items: Film[]
  total: number
  page: number
  totalPages: number
}

export type FilmCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'