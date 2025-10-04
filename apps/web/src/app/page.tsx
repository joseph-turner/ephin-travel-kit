import { AllPosts } from '../components/Posts';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen py-24">
      <h1>Hello!</h1>
      <AllPosts />
    </main>
  );
}
