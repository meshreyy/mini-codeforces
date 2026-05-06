import { Contests } from "../components/Contests";
import { Hero } from "../components/Hero";
import { Problems } from "../components/Problems";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Contests />

        <section className="bg-white py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Problems />
          </div>
        </section>
      </main>
    </div>
  );
}

