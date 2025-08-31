'use client';

import React, { useState } from 'react';
import { User, Book, Clock, Calendar, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockUser = {
  name: '홍길동',
  memberId: 'LIB2024001',
  memberType: '정회원',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  address: '인천광역시 연수구 컨벤시아대로 123',
  joinDate: '2020.03.15',
  expireDate: '2025.03.14',
};

const borrowedBooks = [
  {
    id: 1,
    title: '아몬드',
    author: '손원평',
    loanDate: '2024.01.15',
    dueDate: '2024.02.05',
    extendCount: 1,
    maxExtend: 2,
    overdue: false,
  },
  {
    id: 2,
    title: '코스모스',
    author: '칼 세이건',
    loanDate: '2024.01.10',
    dueDate: '2024.01.31',
    extendCount: 0,
    maxExtend: 2,
    overdue: true,
  },
  {
    id: 3,
    title: '사피엔스',
    author: '유발 하라리',
    loanDate: '2024.01.20',
    dueDate: '2024.02.10',
    extendCount: 0,
    maxExtend: 2,
    overdue: false,
  },
];

const reservedBooks = [
  {
    id: 1,
    title: '1984',
    author: '조지 오웰',
    reserveDate: '2024.01.25',
    position: 2,
    expectedDate: '2024.02.15',
  },
];

const menuItems = [
  { id: 'profile', title: '내정보', icon: User, active: true },
  { id: 'loan', title: '대출현황', icon: Book },
  { id: 'history', title: '대출이력', icon: Clock },
  { id: 'reservation', title: '예약현황', icon: Calendar },
  { id: 'wishlist', title: '관심도서', icon: Heart },
  { id: 'settings', title: '설정', icon: Settings },
];

export default function MyLibraryPage() {
  const [activeMenu, setActiveMenu] = useState('profile');

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-primary-600 text-white p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                  <p className="opacity-90">{mockUser.memberType} • {mockUser.memberId}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{borrowedBooks.length}</div>
                  <div className="text-gray-600">대출중인 도서</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{reservedBooks.length}</div>
                  <div className="text-gray-600">예약중인 도서</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-institution-yeonsu">127</div>
                  <div className="text-gray-600">총 대출 권수</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">회원 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">이름</label>
                    <p className="mt-1 text-gray-900">{mockUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">회원번호</label>
                    <p className="mt-1 text-gray-900">{mockUser.memberId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">회원유형</label>
                    <p className="mt-1 text-gray-900">{mockUser.memberType}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <p className="mt-1 text-gray-900">{mockUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">연락처</label>
                    <p className="mt-1 text-gray-900">{mockUser.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">가입일</label>
                    <p className="mt-1 text-gray-900">{mockUser.joinDate}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button>정보 수정</Button>
              </div>
            </div>
          </div>
        );

      case 'loan':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">대출 현황</h2>
              <div className="text-sm text-gray-600">
                총 <span className="font-bold text-primary">{borrowedBooks.length}</span>권 대출 중
              </div>
            </div>

            <div className="space-y-4">
              {borrowedBooks.map((book) => (
                <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-gray-600 mb-4">{book.author}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">대출일:</span>
                          <p className="font-medium">{book.loanDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">반납예정일:</span>
                          <p className={`font-medium ${book.overdue ? 'text-red-600' : 'text-gray-900'}`}>
                            {book.dueDate} {book.overdue && '(연체)'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">연장횟수:</span>
                          <p className="font-medium">{book.extendCount}/{book.maxExtend}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">상태:</span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            book.overdue 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {book.overdue ? '연체' : '정상'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex flex-col gap-2">
                      <Button 
                        size="small" 
                        disabled={book.extendCount >= book.maxExtend || book.overdue}
                      >
                        연장
                      </Button>
                      <Button variant="tertiary" size="small">
                        반납
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reservation':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">예약 현황</h2>
              <div className="text-sm text-gray-600">
                총 <span className="font-bold text-primary">{reservedBooks.length}</span>권 예약 중
              </div>
            </div>

            <div className="space-y-4">
              {reservedBooks.map((book) => (
                <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-gray-600 mb-4">{book.author}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">예약일:</span>
                          <p className="font-medium">{book.reserveDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">대기순번:</span>
                          <p className="font-medium text-primary">{book.position}번째</p>
                        </div>
                        <div>
                          <span className="text-gray-500">예상 대출일:</span>
                          <p className="font-medium">{book.expectedDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button variant="tertiary" size="small">
                        예약 취소
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">준비 중인 기능입니다.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 사이드바 */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-bold mb-4">나의 도서관</h2>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                          activeMenu === item.id
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}