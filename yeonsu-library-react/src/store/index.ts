import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LibraryBook, SearchFilter, InstitutionType } from '@/types';

// 사용자 상태 관리
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

// 검색 상태 관리
interface SearchState {
  query: string;
  filters: SearchFilter;
  results: any[];
  totalResults: number;
  isLoading: boolean;
  currentPage: number;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilter>) => void;
  setResults: (results: any[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: number) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  query: '',
  filters: {},
  results: [],
  totalResults: 0,
  isLoading: false,
  currentPage: 1,
  setQuery: (query) => set({ query }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  setResults: (results, totalResults) => set({ results, totalResults }),
  setLoading: (isLoading) => set({ isLoading }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  clearSearch: () => set({ 
    query: '', 
    filters: {}, 
    results: [], 
    totalResults: 0, 
    currentPage: 1 
  }),
}));

// UI 상태 관리
interface UIState {
  isMobileMenuOpen: boolean;
  currentInstitution: InstitutionType;
  theme: 'light' | 'dark';
  setMobileMenuOpen: (open: boolean) => void;
  setCurrentInstitution: (institution: InstitutionType) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      currentInstitution: '전체',
      theme: 'light',
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
      setCurrentInstitution: (currentInstitution) => set({ currentInstitution }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);