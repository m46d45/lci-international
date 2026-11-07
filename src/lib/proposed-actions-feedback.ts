import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  ALL_PROPOSED_ACTIONS,
  FEEDBACK_CHOICES,
  type FeedbackChoice,
} from "./proposed-actions-content";

const CHOICE_VALUES = FEEDBACK_CHOICES.map((c) => c.value) as [
  FeedbackChoice,
  ...FeedbackChoice[],
];

const ACTION_IDS = ALL_PROPOSED_ACTIONS.map((a) => a.id) as [
  string,
  ...string[],
];

const pointResponseSchema = z
  .object({
    actionId: z.enum(ACTION_IDS),
    choice: z.enum(CHOICE_VALUES),
    comment: z.string().trim().max(2000).default(""),
  })
  .superRefine((value, ctx) => {
    if (value.choice === "comment" && !value.comment) {
      ctx.addIssue({
        code: "custom",
        message: "Comment is required when Comment is selected",
        path: ["comment"],
      });
    }
  });

const feedbackSchema = z.object({
  name: z.string().trim().min(1).max(200),
  organisation: z.string().trim().min(1).max(200),
  email: z
    .string()
    .trim()
    .max(320)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Invalid email",
    })
    .default(""),
  responses: z.array(pointResponseSchema).min(1).max(ALL_PROPOSED_ACTIONS.length),
});

export type ProposedActionsFeedback = z.infer<typeof feedbackSchema>;

const FEEDBACK_TO = "abduh@itb.ac.id";

function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

function choiceLabel(choice: FeedbackChoice): string {
  return FEEDBACK_CHOICES.find((c) => c.value === choice)?.label ?? choice;
}

function formatBody(payload: ProposedActionsFeedback): string {
  const byId = new Map(
    ALL_PROPOSED_ACTIONS.map((action) => [action.id, action] as const),
  );
  const lines = [
    "Feedback on LCI International proposed actions and initiatives (working draft, November 2026)",
    "",
    `Name: ${payload.name}`,
    `LCI / Country: ${payload.organisation}`,
    payload.email ? `Email: ${payload.email}` : "Email: (not provided)",
    "",
    "Responses:",
  ];

  for (const response of payload.responses) {
    const action = byId.get(response.actionId);
    const number = action?.number ?? "?";
    const title = action?.title ?? response.actionId;
    lines.push("");
    lines.push(`${number}. ${title}`);
    lines.push(`   Choice: ${choiceLabel(response.choice)}`);
    if (response.comment) {
      lines.push(`   Comment: ${response.comment}`);
    }
  }

  const answered = new Set(payload.responses.map((r) => r.actionId));
  const skipped = ALL_PROPOSED_ACTIONS.filter((a) => !answered.has(a.id));
  if (skipped.length > 0) {
    lines.push("");
    lines.push("No response for:");
    for (const action of skipped) {
      lines.push(`- ${action.number}. ${action.title}`);
    }
  }

  return lines.join("\n");
}

async function deliver(
  payload: ProposedActionsFeedback,
): Promise<{ channel: string }> {
  const webhook = env("CONTACT_WEBHOOK_URL");
  const resendKey = env("RESEND_API_KEY");
  const from =
    env("CONTACT_FROM_EMAIL") ?? "LCI Community <onboarding@resend.dev>";

  const body = {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: "lci-proposed-actions-feedback",
    to: FEEDBACK_TO,
    subject: `[LCI International] Feedback on proposed actions — ${payload.name} (${payload.organisation})`,
    text: formatBody(payload),
  };

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Webhook responded ${res.status}`);
    }
    return { channel: "webhook" };
  }

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [FEEDBACK_TO],
        reply_to: payload.email || undefined,
        subject: body.subject,
        text: body.text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Resend responded ${res.status}${detail ? `: ${detail}` : ""}`,
      );
    }
    return { channel: "email" };
  }

  const { appendFile, mkdir } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    join(dir, "proposed-actions-feedback.jsonl"),
    `${JSON.stringify(body)}\n`,
    "utf8",
  );
  console.info(
    "[proposed-actions] stored locally (.data/proposed-actions-feedback.jsonl). Set CONTACT_WEBHOOK_URL or RESEND_API_KEY to deliver to abduh@itb.ac.id.",
  );
  return { channel: "local" };
}

export const submitProposedActionsFeedback = createServerFn({ method: "POST" })
  .validator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true; channel: string }> => {
    const channel = await deliver(data);
    return { ok: true, ...channel };
  });
