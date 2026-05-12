/* ============================================
   GLOBAL TYPES — partagés entre toutes les features
   ============================================ */

// ── Réponse API générique ──
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// ── Pagination ──
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginationParams {
  page?: number
  perPage?: number
}

// ── États UI async ──
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: AsyncStatus
  error: string | null
}

// ── Erreur standardisée ──
export interface AppError {
  message: string
  status?: number
  code?: string
}

// ── Utilitaires TypeScript ──
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type ID = string | number

// ── Feature identifiers ──
export type FeatureId = 'films' | 'weather' | 'crypto'

export interface FeatureMeta {
  id: FeatureId
  label: string
  description: string
  icon: string
  colorToken: string
  path: string
}

// ── Registry des features (utilisé dans le Header/nav) ──
export const FEATURES: FeatureMeta[] = [
  {
    id: 'films',
    label: 'Films',
    description: 'Explore popular movies',
    icon: '🎬',
    colorToken: 'var(--color-films)',
    path: '/films',
  },
  {
    id: 'weather',
    label: 'Weather',
    description: 'Real-time weather data',
    icon: '🌤️',
    colorToken: 'var(--color-weather)',
    path: '/weather',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    description: 'Live crypto prices',
    icon: '₿',
    colorToken: 'var(--color-crypto)',
    path: '/crypto',
  },
]