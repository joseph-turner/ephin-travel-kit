import { AllPosts } from '@/components/Posts';
import { Hero } from '@/components/sections';

export default async function Page() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Content Sections */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <AllPosts />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6">
                Travel with Purpose
              </h2>
              <p className="text-lg text-primary/80 mb-8 leading-relaxed">
                Every journey tells a story. Our curated experiences focus on
                meaningful connections, sustainable practices, and authentic
                cultural immersion. Discover places that inspire, challenge, and
                transform.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-primary/70">
                    Sustainable travel practices
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-primary/70">
                    Local community support
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-primary/70">
                    Authentic cultural experiences
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-primary/40 font-display text-lg">
                  [Featured Travel Image]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
