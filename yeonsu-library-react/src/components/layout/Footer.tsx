'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Library {
  name: string;
  address: string;
  phone: string;
  fax?: string;
  extra?: string;
}

const libraries: Library[] = [
  {
    name: '연수청학도서관',
    address: '인천광역시 연수구 솔샘로 146',
    phone: '032-749-8270',
    extra: '정보를 입력해주세요',
  },
  {
    name: '연수꿈담도서관',
    address: '인천광역시 연수구 연우금로 164',
    phone: '032-749-8200',
    fax: '032-749-8209',
  },
  {
    name: '송도국제어린이도서관',
    address: '인천광역시 연수구 컨벤시아대로 43',
    phone: '032-749-8220',
    fax: '032-749-8229',
  },
  {
    name: '해돋이도서관',
    address: '인천광역시 연수구 해돋이로 7',
    phone: '032-749-6710',
    fax: '032-749-6959',
  },
  {
    name: '선학별빛도서관',
    address: '인천광역시 연수구 봉재산로54번길 30',
    phone: '032-749-6710',
    fax: '032-749-6719',
  },
  {
    name: '동춘나래도서관',
    address: '인천광역시 연수구 봉재산로54번길 30',
    phone: '032-749-8240',
    fax: '032-811-2908',
  },
  {
    name: '함박비류도서관',
    address: '인천광역시 연수구 함박안로 217',
    phone: '032-749-6970',
    fax: '032.749.6979',
  },
];

const copyrightLinks = [
  { href: '/privacy-policy', text: '개인정보처리방침', bold: true },
  { href: '/terms', text: '이용약관', bold: false },
  { href: '/directions', text: '찾아오시는 길', bold: false },
];

export default function Footer() {
  return (
    <footer className="footer bg-gray-50 border-t">
      <div className="footer__content">
        {/* 관련사이트 배너 영역 */}
        <div className="footer__related-site bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <select className="px-4 py-2 border rounded-md text-sm bg-white">
                <option value="">관련사이트</option>
                <option value="https://www.nl.go.kr">국가도서관</option>
                <option value="https://lib.incheon.go.kr">인천광역시통합도서관</option>
                <option value="https://www.nanet.go.kr">국가전자도서관</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer__main py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* 로고 영역 */}
              <div className="lg:col-span-3">
                <div className="footer__logo mb-6">
                  <Link href="/" className="inline-block">
                    <div className="w-48 h-12 relative">
                      <Image
                        src="/assets/images/logo.svg"
                        alt="연수구립도서관 로고"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  사업자등록번호: 715-83-00032
                </div>
              </div>

              {/* 도서관 정보 영역 */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {libraries.map((library, index) => (
                    <div key={index} className="footer__library-item">
                      <div className="font-medium text-gray-800 mb-2">
                        {library.name}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{library.address}</div>
                        <div>전화: {library.phone}</div>
                        {library.fax && <div>팩스: {library.fax}</div>}
                        {library.extra && (
                          <div className="text-gray-500">{library.extra}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 저작권 영역 */}
          <div className="footer__copyright border-t border-gray-200 pt-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="footer__copyright-links flex flex-wrap items-center gap-4">
                  {copyrightLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      <Link
                        href={link.href}
                        className={cn(
                          'text-sm hover:text-primary transition-colors',
                          link.bold 
                            ? 'font-bold text-primary' 
                            : 'text-gray-600'
                        )}
                      >
                        {link.text}
                      </Link>
                      {index < copyrightLinks.length - 1 && (
                        <span className="text-gray-400">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="footer__copyright-text text-sm text-gray-500">
                  COPYRIGHT(C) 인천연수구립도서관. ALL RIGHT RESERVED.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}