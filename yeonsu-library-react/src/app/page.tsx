'use client';

import React from 'react';
import Link from 'next/link';
import { Search, BookOpen, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            연수구립도서관에<br />오신 것을 환영합니다
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            지식과 문화가 만나는 공간, 여러분의 평생 학습 동반자
          </p>
          
          {/* 검색 바 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="도서명, 저자명, 출판사를 입력하세요"
                  className="h-14 text-lg bg-white/95 border-0"
                />
              </div>
              <Button size="large" className="h-14 px-8 bg-secondary hover:bg-secondary-600">
                <Search className="w-5 h-5 mr-2" />
                검색
              </Button>
            </div>
          </div>

          {/* 퀵 링크 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="tertiary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              인기도서
            </Button>
            <Button variant="tertiary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              신착도서
            </Button>
            <Button variant="tertiary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              추천도서
            </Button>
          </div>
        </div>
      </section>

      {/* 주요 서비스 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 서비스</h2>
            <p className="text-xl text-gray-600">연수구립도서관의 다양한 서비스를 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">도서 검색/대출</h3>
              <p className="text-gray-600 mb-6">40만권의 도서를 검색하고 대출하세요</p>
              <Link href="/library-search">
                <Button variant="ghost" className="text-primary hover:text-primary-600">
                  자세히 보기 →
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">디지털 서비스</h3>
              <p className="text-gray-600 mb-6">전자책, 오디오북을 언제 어디서나</p>
              <Link href="/digital-library">
                <Button variant="ghost" className="text-primary hover:text-primary-600">
                  자세히 보기 →
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-institution-yeonsu/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-institution-yeonsu" />
              </div>
              <h3 className="text-xl font-bold mb-4">문화 프로그램</h3>
              <p className="text-gray-600 mb-6">다양한 문화행사와 교육프로그램</p>
              <Link href="/culture">
                <Button variant="ghost" className="text-primary hover:text-primary-600">
                  자세히 보기 →
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-institution-songdo/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-institution-songdo" />
              </div>
              <h3 className="text-xl font-bold mb-4">나의 도서관</h3>
              <p className="text-gray-600 mb-6">대출현황, 예약현황을 확인하세요</p>
              <Link href="/my-library">
                <Button variant="ghost" className="text-primary hover:text-primary-600">
                  자세히 보기 →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 & 새소식 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">공지사항</h3>
                <Link href="/announcements">
                  <Button variant="ghost" size="small">더보기 +</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: '2024년 겨울독서교실 운영 안내', date: '2024.01.15' },
                  { title: '도서관 시설 개선공사로 인한 임시휴관 안내', date: '2024.01.10' },
                  { title: '신규 전자도서 1,000권 추가 안내', date: '2024.01.05' },
                ].map((notice, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="flex-1 hover:text-primary cursor-pointer">{notice.title}</span>
                    <span className="text-gray-500 text-sm ml-4">{notice.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">이달의 추천도서</h3>
                <Link href="/recommended-books">
                  <Button variant="ghost" size="small">더보기 +</Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">도서명 예시</h4>
                    <p className="text-gray-600 mb-4">저자명 | 출판사</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      이 책은 현대인들에게 필요한 인문학적 소양을 기를 수 있는 좋은 책입니다. 
                      일상 속에서 만나는 철학적 사고를 통해 더 깊이 있는 삶을 살아갈 수 있도록 안내합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
