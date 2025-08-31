'use client';

import React from 'react';
import { User, LogIn, Globe, Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/popups', icon: User, text: '팝업모음' },
  { href: '/auth/register', icon: User, text: '회원가입' },
  { href: '/auth/login', icon: LogIn, text: '로그인' },
  { href: '#', icon: Globe, text: 'English' },
  { href: '/sitemap', icon: Map, text: '사이트맵' },
];

export default function Header() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

  return (
    <div className="header bg-white shadow-sm border-b">
      <div className="header-top container mx-auto px-4 py-3">
        {/* TOP 메뉴 */}
        <div className="flex items-center justify-between">
          <div className="header-left">
            <Link href="/" className="logo flex items-center">
              <div className="w-48 h-12 relative">
                <Image
                  src="/assets/images/logo.svg"
                  alt="연수구립도서관 로고"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="header-right hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="nav-item flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label="메뉴 열기"
          >
            <div className={cn(
              "w-6 h-0.5 bg-gray-600 transition-all duration-300",
              isMobileMenuOpen && "rotate-45 translate-y-1.5"
            )} />
            <div className={cn(
              "w-6 h-0.5 bg-gray-600 transition-all duration-300",
              isMobileMenuOpen && "opacity-0"
            )} />
            <div className={cn(
              "w-6 h-0.5 bg-gray-600 transition-all duration-300",
              isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
            )} />
          </button>
        </div>
      </div>

      {/* Global Navigation Bar */}
      <nav className="gnb bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8">
              <Link href="/library-search" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                도서검색
              </Link>
              <Link href="/reading-yeonsu" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                책 읽는 연수구
              </Link>
              <Link href="/info" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                안내마당
              </Link>
              <Link href="/services" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                도서서비스
              </Link>
              <Link href="/participation" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                열린참여마당
              </Link>
              <Link href="/culture" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                문화마당
              </Link>
              <Link href="/about" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                도서관소개
              </Link>
              <Link href="/my-library" className="py-4 px-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                나의도서관
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2"
                aria-label="메뉴 닫기"
              >
                ✕
              </button>
              
              <div className="mt-8 space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}