import { promises as fs } from "node:fs";
import path from "node:path";
import { cms } from "@/lib/cms";
import { site } from "@/lib/content";

export const runtime = "nodejs";

const REFERENCE = () =>
  `LIS-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

function mailtoFor(kind: "application" | "enquiry", payload: Record<string, unknown>, reference: string) {
  const to = kind === "application" ? site.contact.admissionsEmail ?? site.contact.email : site.contact.email;
  const subject = `${kind === "application" ? "Application" : "Website enquiry"} — ${reference}`;
  const lines = Object.entries(payload)
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}: ${String(v)}`);
  const body = [`Reference: ${reference}`, `School: ${site.school.name}`, "", ...lines, "", "Sent from the LIS website. Please reply to this address."].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Local outbox so the form is never a dead end while running without a CMS. */
async function queue(payload: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), "submissions");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "outbox.jsonl"), `${JSON.stringify({ at: new Date().toISOString(), ...payload })}\n`, "utf8");
    return true;
  } catch {
    return false; // read-only filesystem (e.g. Vercel serverless) — expected
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Could not read the form data." }, { status: 400 });
  }

  const kind = payload.kind === "application" ? "application" : "enquiry";
  const email = String(payload.email ?? "");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "Please give us an email address we can reply to." }, { status: 422 });
  }
  const required = kind === "application" ? ["firstName", "lastName", "parentName", "phone"] : ["name", "message"];
  const missing = required.filter((field) => !String(payload[field] ?? "").trim());
  if (missing.length) {
    return Response.json({ error: `Please complete: ${missing.join(", ")}.` }, { status: 422 });
  }

  const reference = REFERENCE();
  const record = { kind, reference, submittedAt: new Date().toISOString(), ...payload, source: "website" };

  if (cms.writeEnabled) {
    try {
      await cms.create(kind, record);
      return Response.json({
        status: "cms" as const,
        reference,
        message: "It is saved with the admissions desk and we will be in touch.",
      });
    } catch (error) {
      console.warn("[submit] Sanity write failed, using fallback:", (error as Error).message);
    }
  }

  const saved = await queue(record);
  return Response.json({
    status: "email" as const,
    reference,
    mailto: mailtoFor(kind, payload, reference),
    message: saved
      ? "Saved in ./submissions/outbox.jsonl on this machine. Until the CMS is connected, use the button below to also send it to the office."
      : "This site is not yet connected to a database, so please use the button below to send the same details by email — everything is filled in for you.",
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "/api/submit",
    cmsConnected: cms.enabled,
    cmsWritable: cms.writeEnabled,
    accepts: ["application", "enquiry"],
  });
}
