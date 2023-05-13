export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <article className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-auto">{children}</article>;
}
