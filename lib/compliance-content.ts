/**
 * /compliance — what the rules are and how a system we build stays
 * inside them.
 *
 * THE LINE THIS FILE MUST NOT CROSS. Everything here describes how
 * ArkFlow operates and what Singapore law and WhatsApp's own policy
 * require. Nothing here is legal advice, and nothing claims a
 * certification, audit, accreditation or registration that ArkFlow
 * does not hold — because it holds none. We are not ISO certified, we
 * are not a Meta Business Partner, and we have not been audited by
 * anyone. Saying so plainly is worth more than a badge, and inventing
 * one would be the single fastest way to lose a clinic's trust.
 *
 * The binding documents are the signed DPA and /terms. This page is a
 * plain-English summary of how we work, not a contract.
 *
 * SOURCES, for whoever updates this:
 *  - Personal Data Protection Act 2012 (PDPA), and the PDPC's advisory
 *    guidelines on consent, notification, access and retention.
 *  - The Do Not Call provisions in Part 9 of the PDPA, and the PDPC's
 *    guidance that they cover telephone numbers, which includes
 *    WhatsApp messages sent to them.
 *  - WhatsApp Business Messaging Policy and Meta's template approval
 *    rules, which are the operator's problem long before they are the
 *    regulator's.
 *  - The Healthcare Services Act 2020 (HCSA) advertising provisions
 *    and MOH's guidance for licensed healthcare services.
 *
 * Each of these changes from time to time. Date-check this page
 * against the primary sources before relying on it.
 */

export const complianceHero = {
  eyebrow: "Compliance",
  title: "The rules a clinic's messaging has to live inside.",
  lead: "Automating patient contact in Singapore means PDPA, the Do Not Call registry, WhatsApp's own policy and the advertising rules for licensed healthcare services. Here is how a system we build handles each, and what we are not.",
};

export type ComplianceSection = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: { term: string; detail: string }[];
};

export const complianceSections: ComplianceSection[] = [
  {
    id: "pdpa",
    label: "PDPA",
    title: "Consent, purpose and how long data is kept",
    body: "The Personal Data Protection Act governs how a clinic collects, uses and keeps a patient's personal data. A system that messages people automatically is doing all three, so it has to be built to the same standard as the front desk.",
    points: [
      {
        term: "Consent is collected at the point the data is",
        detail: "Every form, chat entry point and booking step we build states who is collecting the data, what it will be used for, and how to withdraw consent, on the same screen as the first field. Not in a policy three clicks away.",
      },
      {
        term: "Purpose limitation is built into the message templates",
        detail: "A number given to book a consultation is used to run that consultation. Using it for a promotion is a separate purpose and needs separate consent, so marketing templates and service templates are kept apart in the system rather than left to someone's judgement on the day.",
      },
      {
        term: "Withdrawal works in one message",
        detail: "Every automated sequence we build responds to a stop request by ending the sequence, and records the withdrawal against the contact so a later campaign cannot pick them up again.",
      },
      {
        term: "Retention is a setting, not a habit",
        detail: "Enquiry and booking data is held for a period the clinic decides and we configure. At the end of an engagement the clinic's data stays with the clinic, in the clinic's own platform account.",
      },
      {
        term: "We never hold clinical records",
        detail: "The system handles enquiry, scheduling and reminder information. Treatment notes, images and medical history stay in the clinic's own clinical system and are not connected to it.",
      },
    ],
  },
  {
    id: "dnc",
    label: "Do Not Call",
    title: "Reactivation messages and the DNC registry",
    body: "Part 9 of the PDPA covers unsolicited marketing to Singapore telephone numbers, and the PDPC's position is that this includes messages sent over apps to those numbers. Reactivation — messaging someone who has not visited in a while — is exactly the activity that has to be handled carefully.",
    points: [
      {
        term: "Existing business relationship is not a blanket exemption",
        detail: "There is a narrow exemption for ongoing relationships, and it is narrower than most clinics assume. We treat clear, recorded consent to be contacted with offers as the working requirement, and build the consent capture that produces it.",
      },
      {
        term: "Marketing sequences check consent before they send",
        detail: "A reactivation campaign in a system we build only sends to contacts carrying a recorded marketing consent. Contacts without one are excluded by the system rather than filtered by hand.",
      },
      {
        term: "Register checking stays the clinic's decision",
        detail: "Where a clinic wants numbers screened against the DNC registry, that is a subscription the clinic holds with the PDPC and a step we wire into the sending flow. We do not hold it on their behalf.",
      },
      {
        term: "Service messages are not marketing",
        detail: "An appointment reminder for a booking the patient made is a service message. A message offering a treatment is marketing. The two are configured separately so the distinction survives contact with a busy week.",
      },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp policy",
    title: "Opt-in, templates and the 24-hour window",
    body: "WhatsApp enforces its own rules on top of the law, and it enforces them faster. A number that collects complaints gets its quality rating cut and then its throughput limited, which in practice means the clinic's messages stop arriving.",
    points: [
      {
        term: "Opt-in before the first business-initiated message",
        detail: "WhatsApp requires an opt-in obtained in any channel, recorded, before a business messages someone first. We build the capture and keep the record against the contact.",
      },
      {
        term: "Templates are pre-approved, so improvisation is impossible",
        detail: "Any message sent outside the 24-hour customer service window has to use a template Meta has approved. The clinic approves the wording, Meta approves the template, and the system can only send what is in it.",
      },
      {
        term: "Inside 24 hours, replies are free-form but still bounded",
        detail: "When a patient messages first, the system can answer conversationally for 24 hours. What it is allowed to say is constrained by the clinic's own approved wording, not by what a language model thinks is reasonable.",
      },
      {
        term: "One number, and the clinic owns it",
        detail: "The WhatsApp Business API number is registered to the clinic's own Meta Business account. If the engagement ends, the number, the templates and the history stay with the clinic.",
      },
    ],
  },
  {
    id: "advertising",
    label: "Advertising rules",
    title: "Staying inside what a licensed clinic may say",
    body: "Licensed healthcare services in Singapore operate under the Healthcare Services Act and MOH's advertising provisions. These restrict claims about outcomes, comparisons, inducements and testimonials — and they apply to a WhatsApp message exactly as they apply to a poster.",
    points: [
      {
        term: "The clinic writes the wording; we build what it says",
        detail: "Every template, auto-reply and sequence is approved by the clinic before it goes live. We do not draft treatment claims, and we do not let a model generate them at send time.",
      },
      {
        term: "No outcome promises and no before-and-after by default",
        detail: "The system is configured so that automated replies describe services and availability, and route anything touching results, suitability or risk to a human.",
      },
      {
        term: "No inducements written into automation",
        detail: "Discounts, gifts and referral rewards are restricted for licensed services. Our reactivation sequences are built around reminders and availability rather than incentives, unless the clinic's own compliance position says otherwise in writing.",
      },
      {
        term: "Clinical judgement is always a handover",
        detail: "Anything that reads as a question about whether a treatment is right for a particular person stops the automation and hands the conversation to clinic staff. That boundary is a hard rule in the build, not a prompt instruction.",
      },
    ],
  },
];

/**
 * What ArkFlow is not. On the page, in plain sight.
 *
 * DO NOT SOFTEN THESE AND DO NOT ADD A CREDENTIAL. If ArkFlow ever
 * earns one, it goes here with the issuing body and the date.
 */
export const complianceLimits = {
  title: "What we are not",
  items: [
    "Not a law firm. Nothing here is legal advice, and a clinic's own counsel or compliance officer has the final word on what it may say.",
    "Not certified. ArkFlow holds no ISO certification, no security accreditation and no partner status with Meta or any platform. We have not been independently audited.",
    "Not the data controller. The clinic owns the patient relationship and the data. We are a processor acting on the clinic's instructions, under a signed agreement.",
    "Not a clinical system. We do not store, access or integrate with treatment records.",
  ],
};
