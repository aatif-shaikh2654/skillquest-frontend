import { Hero, MotionRoot, Navbar } from "@/features/landing";

export default function Page() {
  return (
    <MotionRoot>
      <main>
        <Navbar />
        <Hero />
      </main>
    </MotionRoot>
  );
}
