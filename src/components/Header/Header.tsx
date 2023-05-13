'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const onSearchBtnClick = () => {
    setIsSearch((isSearch) => !isSearch);
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && searchRef.current) {
      router.push(`/search/${searchRef.current.value}`);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center w-full h-[50px] px-[16px] bg-blue-950">
        <Link className="text-2xl" href={'/'}>
          Movies
        </Link>

        <div className="flex gap-8">
          <button onClick={onSearchBtnClick}>Search</button>
        </div>
      </nav>
      {isSearch && (
        <div className="flex justify-between  items-center absolute p-4 gap-4 w-full bg-white text-black">
          <input className="outline-none	w-11/12" ref={searchRef} placeholder="영화 검색" onKeyDown={onKeyDownEnter} />
          <button onClick={onSearchBtnClick}>닫기</button>
        </div>
      )}
    </>
  );
}
