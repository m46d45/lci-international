import { createFileRoute } from "@tanstack/react-router";
import { SITE_DESCRIPTION, pageTitle } from "@/lib/site";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: pageTitle("How we work") },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
    ],
  }),
  component: HowWeWorkPage,
});

const POINTS = [
  {
    kicker: "01",
    title: "Meet quarterly",
    body: "Representatives of national and regional institutes meet four times a year.",
  },
  {
    kicker: "02",
    title: "Agree shared work there",
    body: "Anything done together is decided in that meeting, for that year.",
  },
  {
    kicker: "03",
    title: "Recognise one another at home",
    body: "Each institute remains the voice of Lean Construction in its own country.",
  },
];

const DIRECTORY_STATUSES = [
  {
    name: "Listed",
    detail: "A representative has been named and has joined.",
  },
  {
    name: "To be confirmed",
    detail: "The representative is named; the organisation or mandate is being confirmed.",
  },
  {
    name: "In formation",
    detail: "An institute is being established.",
  },
  {
    name: "Recognised",
    detail: "The institute has endorsed the Memorandum of Understanding.",
  },
];

function HowWeWorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">How we work</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          A framework, not a headquarters
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Meet, decide what to do together, and leave each national institute in place.
        </p>
      </header>

      <ol className="mt-10 space-y-6">
        {POINTS.map((p) => (
          <li
            key={p.kicker}
            className="grid gap-4 border-t border-line pt-6 sm:grid-cols-[5rem_1fr]"
          >
            <p className="font-display text-3xl text-accent">{p.kicker}</p>
            <div>
              <h2 className="font-display text-2xl font-medium">{p.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 max-w-3xl border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Recognition of institutes</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          Each national or regional institute is recognised as the non-profit Lean Construction
          organisation for its country or region.
        </p>
        <h3 className="mt-8 font-display text-xl font-medium">Directory status</h3>
        <dl className="mt-4 border-b border-line">
          {DIRECTORY_STATUSES.map((status) => (
            <div
              key={status.name}
              className="grid gap-1 border-t border-line py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-4"
            >
              <dt className="font-medium text-ink">{status.name}</dt>
              <dd className="text-sm leading-relaxed text-ink-soft">{status.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>Changes in status are agreed at the quarterly meeting.</p>
          <p>Recognition does not affect an institute&apos;s own strategy, activities, or plans.</p>
        </div>
      </section>

      <section className="mt-12 max-w-2xl border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Lessons learned</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Institutes share lessons from project implementations and report results to the other
          parties.
        </p>
      </section>
    </main>
  );
}
