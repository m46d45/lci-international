/** Working draft: LCI International proposed actions and initiatives (November 2026). */

export type FeedbackChoice = "agree" | "disagree" | "comment";

export const FEEDBACK_CHOICES: Array<{ value: FeedbackChoice; label: string }> =
  [
    { value: "agree", label: "Agree" },
    { value: "disagree", label: "Disagree" },
    { value: "comment", label: "Comment" },
  ];

export type ProposedAction = {
  id: string;
  number: number;
  title: string;
  details?: string[];
};

export type ProposedSection = {
  id: string;
  title: string;
  intro?: string;
  actions: ProposedAction[];
};

export const DRAFT_META = {
  title: "Proposed actions and initiatives (working draft)",
  eyebrow: "Working draft · November 2026",
  aim: "The aim of this document is to begin working towards a common goal, improve knowledge transfer among existing LCIs, and support and promote the creation of new LCIs in countries where they do not yet exist.",
  intro:
    "This is a working draft open for comment from national LCIs that will sign the MOU. It is not final. Feedback is collected so the group can revise it.",
} as const;

export const GENERAL_PRINCIPLES: string[] = [
  "Each national LCI operates independently and defines its own approach to Lean transformation. Diversity of approaches is what allows us to learn from one another.",
  "Any organization may declare itself an LCI and join the group by signing the common MOU. The group does not “register” or approve LCIs; it only decides whether or not to continue its association with an LCI.",
  "Minimize bureaucracy: before creating structures, carefully define which governance decisions need to be made and what funding is needed for.",
  "Do not create a board of directors for now.",
  "LCIs focus on practice and on increasing market penetration; therefore, their meetings are held separately from those of IGLC (which focuses on research).",
  "Proposals that affect all national LCIs are decided by vote, with one vote per LCI.",
  "We should start simply by encouraging information sharing and let the regions facilitate it.",
];

export const PROPOSED_SECTIONS: ProposedSection[] = [
  {
    id: "governance",
    title: "Governance",
    actions: [
      {
        id: "g1",
        number: 1,
        title:
          "Create a three-person coordination group made up of leaders of national LCIs, serving one-year terms.",
        details: [
          "We want to have volunteers from each region that rotate in the region.",
          "Each region can/should provide candidates and define who is going to be the suggested person.",
          "The coordination group will select their own successor.",
        ],
      },
      {
        id: "g2",
        number: 2,
        title: "The coordination group will have the following functions:",
        details: [
          "Manage the development and revision of proposals (collect and count votes if it is necessary).",
          "Respond to requests regarding new membership.",
          "Keep the LCI International webpage updated.",
          "Manage the process of disassociating LCIs.",
          "Identify countries where no LCI exists and explore a plan to create one in each case (delegate the formalizing process to the region; there must be consensus in the country).",
          "Generate and keep updated a list of countries that asked for information or are in process of formalizing an LCI.",
        ],
      },
      {
        id: "g3",
        number: 3,
        title:
          "Define the details of any regional structure (e.g., Europe, Africa, Asia).",
        details: [
          "How do we define the region?",
          "Number of LCIs?",
          "Time zone?",
          "Continent?",
          "Other?",
        ],
      },
    ],
  },
  {
    id: "joining",
    title: "Joining and disassociation of LCIs",
    actions: [
      {
        id: "j4",
        number: 4,
        title:
          "Define a simple protocol with minimum requirements for LCIs (e.g., non-profit organization, open to the community) and prepare a document explaining to interested parties the governance and affiliation models, the support available, and the process and next steps for joining.",
      },
      {
        id: "j5",
        number: 5,
        title: "Define the disassociation protocol.",
        details: [
          "An LCI identifies possible MOU nonperformance by another LCI.",
          "A three-person team is formed to collect information.",
          "The LCI concerned is advised and given the opportunity to correct its practice.",
          "The team reports its findings with a recommendation.",
          "LCIs vote.",
        ],
      },
      {
        id: "j6",
        number: 6,
        title:
          "When an LCI is disassociated, the group will try to form a replacement LCI in that country.",
      },
      {
        id: "j7",
        number: 7,
        title:
          "Clarify the difference between an LCI-USA CoP and a national LCI that is a member of the international network.",
      },
      {
        id: "j9",
        number: 9,
        title:
          "When a new LCI is formed, an existing LCI is assigned as a mentor to support its start-up.",
      },
    ],
  },
  {
    id: "learning",
    title: "Learning from one another",
    actions: [
      {
        id: "l10",
        number: 10,
        title: "Each LCI periodically prepares and shares a report describing:",
        details: [
          "Its current share of the national construction market.",
          "The initiatives that have worked (and those that have not) in developing the capabilities and competitiveness of its member companies.",
          "The topics on which it would like help from other LCIs.",
          "Reports will be prepared quarterly (the purpose is to accelerate learning, not to audit or hold LCIs accountable).",
          "Each LCI writes its reports in its own language; the receiving LCIs are responsible for translating them.",
        ],
      },
      {
        id: "l11",
        number: 11,
        title:
          "Hold periodic meetings to share this information, combining virtual and in-person meetings.",
      },
      {
        id: "l12",
        number: 12,
        title:
          "The host of in-person meetings rotates among LCIs and is selected from offers made in advance.",
      },
      {
        id: "l13",
        number: 13,
        title:
          "Any LCI that needs help may ask other LCIs for it directly. The relevant coordinator from the coordination group (or whichever role is defined) should be informed, in order to keep initiatives in each country aligned (and avoid parallel efforts).",
      },
      {
        id: "l14",
        number: 14,
        title:
          "Generate a website of LCI International with information about existing communities.",
      },
      {
        id: "l15",
        number: 15,
        title:
          "Define how we are going to measure market penetration or impact of each LCI.",
      },
    ],
  },
];

export const ALL_PROPOSED_ACTIONS: ProposedAction[] =
  PROPOSED_SECTIONS.flatMap((section) => section.actions);

export function actionById(id: string): ProposedAction | undefined {
  return ALL_PROPOSED_ACTIONS.find((action) => action.id === id);
}
