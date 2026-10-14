import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PresenceMap } from "@/components/presence-map";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle() },
      {
        name: "description",
        content: "A quarterly forum where national institutes share lessons and coordinate.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="relative isolate min-h-[min(100dvh,52rem)] overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <PresenceMap variant="bleed" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_oklab,var(--color-bg)_92%,transparent)_0%,color-mix(in_oklab,var(--color-bg)_78%,transparent)_42%,color-mix(in_oklab,var(--color-bg)_35%,transparent)_72%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(100dvh,52rem)] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 lg:justify-center lg:pb-16 lg:pt-20">
          <h1 className="max-w-2xl animate-[fade-up_700ms_var(--ease-out)_both] font-display text-3xl leading-snug font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Lean Construction institutes, working together across countries.
          </h1>
          <p className="mt-4 max-w-md animate-[fade-up_700ms_var(--ease-out)_80ms_both] text-base leading-relaxed text-ink-soft">
            A quarterly forum where national institutes share lessons and coordinate.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3 animate-[fade-up_700ms_var(--ease-out)_140ms_both]">
            <Link to="/directory" className="no-underline">
              <Button>
                See the institutes
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link to="/contact" className="no-underline">
              <Button variant="outline">Contact</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
