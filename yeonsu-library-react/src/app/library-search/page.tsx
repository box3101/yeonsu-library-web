'use client';

import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const searchTypes = [
  { value: 'all', label: '통합검색' },
  { value: 'title', label: '제목' },
  { value: 'author', label: '저자' },
  { value: 'publisher', label: '출판사' },
  { value: 'isbn', label: 'ISBN' },
];

const institutions = [
  { value: 'all', label: '전체도서관' },
  { value: 'main', label: '연수구립도서관' },
  { value: 'songdo', label: '송도국제도서관' },
  { value: 'cheonghak', label: '연수청학도서관' },
  { value: 'yeonsu-dream', label: '연수꿈담도서관' },
];

const categories = [
  { value: 'all', label: '전체분야' },
  { value: '000', label: '총류' },
  { value: '100', label: '철학' },
  { value: '200', label: '종교' },
  { value: '300', label: '사회과학' },
  { value: '400', label: '언어' },
  { value: '500', label: '순수과학' },
  { value: '600', label: '기술과학' },
  { value: '700', label: '예술' },
  { value: '800', label: '문학' },
  { value: '900', label: '역사' },
];

const sampleBooks = [
  {
    id: 1,
    title: '아몬드',
    author: '손원평',
    publisher: '창비',
    year: '2017',
    category: '문학',
    institution: '연수구립도서관',
    status: 'available',
    location: '2층 일반자료실',
  },
  {
    id: 2,
    title: '코스모스',
    author: '칼 세이건',
    publisher: '사이언스북스',
    year: '2020',
    category: '과학',
    institution: '송도국제도서관',
    status: 'borrowed',
    location: '3층 과학자료실',
  },
  {
    id: 3,
    title: '사피엔스',
    author: '유발 하라리',
    publisher: '김영사',
    year: '2015',
    category: '역사',
    institution: '연수청학도서관',
    status: 'available',
    location: '1층 인문자료실',
  },
];

export default function LibrarySearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [selectedInstitution, setSelectedInstitution] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    console.log('검색 실행:', { searchQuery, searchType, selectedInstitution, selectedCategory });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 검색 영역 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">소장도서 검색</h1>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              {/* 기본 검색 */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="lg:w-48">
                  <Select
                    options={searchTypes}
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    placeholder="검색유형"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="lg:w-32">
                  <Button 
                    size="large" 
                    className="w-full h-12"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    검색
                  </Button>
                </div>
              </div>

              {/* 고급검색 토글 */}
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  고급검색 {showAdvanced ? '접기' : '펼치기'}
                </Button>
                <div className="text-sm text-gray-600">
                  전체 도서 <span className="font-bold text-primary">423,156</span>권 보유
                </div>
              </div>

              {/* 고급검색 옵션 */}
              {showAdvanced && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        도서관 선택
                      </label>
                      <Select
                        options={institutions}
                        value={selectedInstitution}
                        onChange={(e) => setSelectedInstitution(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        자료 분야
                      </label>
                      <Select
                        options={categories}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 검색 결과 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">검색 결과</h2>
              <span className="text-sm text-gray-600">
                총 <span className="font-bold text-primary">{sampleBooks.length}</span>건
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">정렬:</span>
              <Select
                options={[
                  { value: 'relevance', label: '관련도순' },
                  { value: 'title', label: '제목순' },
                  { value: 'author', label: '저자순' },
                  { value: 'year', label: '출간년도순' },
                ]}
                value="relevance"
                className="w-32"
              />
            </div>
          </div>

          {/* 검색 결과 목록 */}
          <div className="space-y-4">
            {sampleBooks.map((book) => (
              <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  {/* 책 표지 */}
                  <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  {/* 책 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 hover:text-primary cursor-pointer">
                        {book.title}
                      </h3>
                      <div className="flex-shrink-0">
                        {book.status === 'available' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            대출가능
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            대출중
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">저자:</span> {book.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">출판사:</span> {book.publisher} ({book.year})
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">소장처:</span> {book.institution}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">위치:</span> {book.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button size="small" disabled={book.status !== 'available'}>
                        {book.status === 'available' ? '예약하기' : '대출불가'}
                      </Button>
                      <Button variant="tertiary" size="small">
                        상세정보
                      </Button>
                      <Button variant="ghost" size="small">
                        내 서재에 담기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="tertiary" size="small" disabled>
                이전
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'primary' : 'tertiary'}
                  size="small"
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
              <Button variant="tertiary" size="small">
                다음
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}