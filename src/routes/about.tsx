import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: pageTitle("About") },
      {
        name: "description",
        content:
          "Mission, origin at IGLC-33 in Kyoto, and how national Lean Construction institutes coordinate.",
      },
    ],
  }),
  component: AboutPage,
});

const INVITATIONS = [
  "Coach students who lack well-informed advisors — and include those advisors when they are willing.",
  "Create and support Lean Construction institutes in more countries.",
  "Promote Lean Construction in the public sector, internationally.",
  "Help practitioners help researchers — for example by testing hypotheses.",
  "Help researchers help practitioners — for example by translating selected papers into plain language.",
  "Get Lean Construction teaching materials into education at every level.",
  "Train and coach Lean Construction consultants.",
  "Engage other construction-industry organisations: owners, architects, engineers, trades.",
];

const MILESTONES: Array<{
  date: string;
  iso: string;
  detail: string;
  note?: string;
}> = [
  {
    date: "6 June 2025",
    iso: "2025-06-06",
    detail: "Glenn Ballard's proposal at IGLC-33, Kyoto.",
  },
  {
    date: "9 January 2026",
    iso: "2026-01-09",
    detail: "First online meeting.",
  },
  {
    date: "14 October 2026",
    iso: "2026-10-14",
    detail:
      "Meeting at the LCI Congress, Atlanta (in person and online) to review the Memorandum of Understanding.",
    note: "[Status: endorsed / under review]",
  },
];

function Placeholder({ children }: { children: string }) {
  return <span className="rounded-xs bg-bg-warm px-1.5 py-0.5 text-ink">{children}</span>;
}

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">About</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          Institutes already existed. The missing piece was working together.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          A light international framework among national Lean Construction institutes — not a new
          institute, and not a replacement for the ones at home.
        </p>
      </header>

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-2xl font-medium">Mission</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          To support the transformation of construction industry practice by raising awareness of
          the industry&apos;s current performance, including productivity, and by promoting Lean
          Project Delivery systems and practices.
        </p>
      </section>

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-2xl font-medium">Kyoto, June 2025</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            On 6 June 2025, at the close of IGLC-33 in Kyoto, Glenn Ballard presented{" "}
            <span className="italic text-ink">
              Lean Transformation of the Global Construction Industry
            </span>
            .
          </p>
          <p>
            He noted that Lean Construction was already being advanced in some 29 countries, through
            about 26 national institutes and communities. Each was doing useful work at home. None
            of that work, on its own, would transform the industry worldwide.
          </p>
          <p>
            His proposal was simple: the institutes should work together. This community exists for
            that purpose.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-medium">The invitation from that talk</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          These were the kinds of work he asked the institutes to take on together. They are the
          origin of the community — not a list of programmes already adopted.
        </p>
        <ol className="mt-6 space-y-4">
          {INVITATIONS.map((item, i) => (
            <li
              key={item}
              className="grid gap-3 border-t border-line pt-4 sm:grid-cols-[2.5rem_1fr] sm:items-baseline"
            >
              <span className="font-display text-lg text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 max-w-2xl border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Knowledge exchange</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Institutes share practice in Lean methods, production management, and organisational
          structures, including the &quot;physics&quot; of production: managing dependence and
          variation to improve workflow reliability.
        </p>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-medium">What it is</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>
              A light framework so national and regional institutes can recognise one another.
            </li>
            <li>A directory of who speaks for which country or network.</li>
            <li>A quarterly meeting, and room for shared work when that meeting agrees it.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-medium">What it is not</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>A new institute that replaces the national ones.</li>
            <li>A membership body with dues.</li>
            <li>A publisher of company-level data.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 max-w-3xl border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Milestones</h2>
        <ol className="mt-6 space-y-4">
          {MILESTONES.map((item) => (
            <li
              key={item.date}
              className="grid gap-2 border-t border-line pt-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-4"
            >
              <time dateTime={item.iso} className="font-medium text-ink">
                {item.date}
              </time>
              <p className="text-sm leading-relaxed text-ink-soft">
                {item.detail}
                {item.note ? (
                  <>
                    {" "}
                    <Placeholder>{item.note}</Placeholder>
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 max-w-2xl border-t border-line pt-10">
        <h2 className="font-display text-2xl font-medium">Coordination</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Coordination is provided by <Placeholder>[name / coordinating team]</Placeholder>, as
          agreed at the quarterly meeting. The coordinator maintains the directory and prepares
          meetings, and does not represent any national institute.
        </p>
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
        How the community meets is on{" "}
        <Link to="/how-we-work" className="text-ink underline-offset-2 hover:underline">
          How we work
        </Link>
        . Who speaks for each country is on{" "}
        <Link to="/directory" className="text-ink underline-offset-2 hover:underline">
          Parties
        </Link>
        .
      </p>
    </main>
  );
}
