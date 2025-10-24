import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      {session ? (
        <p>Welcome, {session?.user?.name || 'User'}!</p>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </main>
  );
}
