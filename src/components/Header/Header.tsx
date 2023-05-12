import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full h-[50px] px-[16px] bg-blue-950">
      <Link className="text-2xl" href={'/'}>
        BLOG
      </Link>

      <div className="flex gap-8">
        <Link className="text-1xl hover:text-primary" href={'/'}>
          Search
        </Link>
      </div>
    </nav>
  );
}
