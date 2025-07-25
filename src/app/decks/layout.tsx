import RequireAuth from '@/components/require-auth';

export default function DecksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
