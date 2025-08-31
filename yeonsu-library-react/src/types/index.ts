// 도서관 시스템 타입 정의

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  isbn: string;
  category: string;
  location: string;
  status: 'available' | 'borrowed' | 'reserved';
  coverImage?: string;
  description?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  author?: string;
  type: 'book' | 'ebook' | 'audiobook' | 'video';
  institution: InstitutionType;
  available: boolean;
  coverImage?: string;
}

export type InstitutionType = 
  | '전체'
  | '연수꿈담'
  | '송도국제'
  | '청학'
  | '해돋이'
  | '해찬솔공원'
  | '선학별빛'
  | '누리공원';

export interface User {
  id: string;
  name: string;
  email: string;
  memberType: 'regular' | 'minor' | 'family';
  borrowedBooks: LibraryBook[];
  reservedBooks: LibraryBook[];
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  items?: MenuItem[];
  isExpanded?: boolean;
  external?: boolean;
}

export interface SearchFilter {
  category?: string;
  institution?: InstitutionType;
  availability?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}