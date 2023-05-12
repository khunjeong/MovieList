import { Movies } from '@/components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-auto">
      <h1>영화 목록</h1>
      <Movies />
    </main>
  );
}
