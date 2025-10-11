'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Gradient background instead of image for now */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20"
        initial={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-neutral px-6">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-semibold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
        >
          Intentional Travel. Inspired Design.
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-lg md:text-xl font-sans max-w-2xl text-neutral/90"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
        >
          Discover extraordinary journeys and thoughtful travel experiences
          designed for the mindful explorer.
        </motion.p>
      </div>
    </section>
  );
}
