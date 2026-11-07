import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DRAFT_META,
  FEEDBACK_CHOICES,
  GENERAL_PRINCIPLES,
  PROPOSED_SECTIONS,
  type FeedbackChoice,
  type ProposedAction,
} from "@/lib/proposed-actions-content";
import { submitProposedActionsFeedback } from "@/lib/proposed-actions-feedback";
import { SITE_DESCRIPTION, pageTitle } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proposed-actions")({
  head: () => ({
    meta: [
      { title: pageTitle(DRAFT_META.title) },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProposedActionsPage,
});

type PointState = {
  choice: FeedbackChoice | "";
  comment: string;
};

function emptyPoint(): PointState {
  return { choice: "", comment: "" };
}

function ProposedActionsPage() {
  const submit = useServerFn(submitProposedActionsFeedback);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [points, setPoints] = useState<Record<string, PointState>>({});

  function pointState(id: string): PointState {
    return points[id] ?? emptyPoint();
  }

  function setChoice(id: string, choice: FeedbackChoice) {
    setPoints((prev) => ({
      ...prev,
      [id]: {
        choice,
        comment: choice === "comment" ? (prev[id]?.comment ?? "") : "",
      },
    }));
  }

  function setComment(id: string, comment: string) {
    setPoints((prev) => ({
      ...prev,
      [id]: {
        choice: "comment",
        comment,
      },
    }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !organisation) return;

    const responses = Object.entries(points)
      .filter(([, state]) => state.choice)
      .map(([actionId, state]) => ({
        actionId,
        choice: state.choice as FeedbackChoice,
        comment: state.choice === "comment" ? state.comment.trim() : "",
      }));

    if (responses.length === 0) {
      setError("Please respond to at least one proposal before submitting.");
      return;
    }

    const missingComment = responses.find(
      (r) => r.choice === "comment" && !r.comment,
    );
    if (missingComment) {
      setError("Please add a short comment for each point marked Comment.");
      return;
    }

    setPending(true);
    try {
      await submit({ data: { name, organisation, email, responses } });
      setSent(true);
      setPoints({});
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send. Please try again later.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          {DRAFT_META.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          {DRAFT_META.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {DRAFT_META.intro}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{DRAFT_META.aim}</p>
      </header>

      <form onSubmit={onSubmit} className="mt-10 space-y-12">
        {sent ? (
          <p
            className="rounded-md bg-bg-warm px-4 py-3 text-sm text-accent"
            role="status"
          >
            Thank you. Your feedback was sent. Comments are not shown publicly;
            they go to the coordinator for revision of this draft.
          </p>
        ) : null}

        {error ? (
          <p
            className="rounded-md bg-surface px-4 py-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <section aria-labelledby="identity-heading" className="space-y-4">
          <h2
            id="identity-heading"
            className="font-display text-2xl font-medium"
          >
            Your details
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Name and LCI / country are required so feedback can be attributed.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <Input id="name" name="name" required autoComplete="name" />
            </Field>
            <Field label="LCI / Country (or organisation)" htmlFor="organisation">
              <Input id="organisation" name="organisation" required />
            </Field>
          </div>
          <Field label="Email for reply (optional)" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
            />
          </Field>
        </section>

        <section aria-labelledby="principles-heading">
          <h2
            id="principles-heading"
            className="font-display text-2xl font-medium"
          >
            General principles
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-base leading-relaxed text-ink-soft">
            {GENERAL_PRINCIPLES.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ol>
        </section>

        {PROPOSED_SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            <h2
              id={`section-${section.id}`}
              className="font-display text-2xl font-medium"
            >
              {section.title}
            </h2>
            <div className="mt-6 space-y-8">
              {section.actions.map((action) => (
                <ActionBlock
                  key={action.id}
                  action={action}
                  state={pointState(action.id)}
                  onChoice={(choice) => setChoice(action.id, choice)}
                  onComment={(comment) => setComment(action.id, comment)}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="border-t border-line pt-8">
          <p className="text-sm text-ink-soft">
            Respond to any combination of points, then submit once. Your
            responses are emailed to the coordinator; they are not posted on
            this page.
          </p>
          <Button type="submit" className="mt-5" disabled={pending}>
            {pending ? "Sending…" : "Submit feedback"}
          </Button>
        </div>
      </form>
    </main>
  );
}

function ActionBlock({
  action,
  state,
  onChoice,
  onComment,
}: {
  action: ProposedAction;
  state: PointState;
  onChoice: (choice: FeedbackChoice) => void;
  onComment: (comment: string) => void;
}) {
  const groupName = `choice-${action.id}`;
  return (
    <article className="border-t border-line pt-6">
      <h3 className="text-base font-medium leading-relaxed text-ink">
        <span className="text-muted">{action.number}.</span> {action.title}
      </h3>
      {action.details && action.details.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
          {action.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : null}

      <fieldset className="mt-4">
        <legend className="sr-only">
          Feedback for proposal {action.number}
        </legend>
        <div className="flex flex-wrap gap-2">
          {FEEDBACK_CHOICES.map((option) => {
            const selected = state.choice === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-md px-3.5 py-2 text-sm shadow-[0_0_0_1px_var(--color-line)] transition-colors",
                  selected
                    ? "bg-accent text-accent-fg shadow-none"
                    : "bg-surface text-ink-soft hover:bg-surface-2 hover:text-ink",
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name={groupName}
                  value={option.value}
                  checked={selected}
                  onChange={() => onChoice(option.value)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {state.choice === "comment" ? (
        <div className="mt-3">
          <Label htmlFor={`comment-${action.id}`}>Your comment</Label>
          <Textarea
            id={`comment-${action.id}`}
            className="mt-1.5"
            value={state.comment}
            onChange={(e) => onComment(e.target.value)}
            required
            maxLength={2000}
            placeholder="Short note on this point"
          />
        </div>
      ) : null}
    </article>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
