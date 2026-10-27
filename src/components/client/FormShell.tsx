"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

export type SubmitResult = {
  status: "cms" | "email" | "queued";
  reference?: string;
  mailto?: string;
  message?: string;
};

const DEFAULT_EMAIL = "info@leaderinternationalschool.ac.tz";

function buildClientMailto(payload: Record<string, unknown>, reference: string) {
  const kind = payload.kind === "application" ? "application" : "enquiry";
  const subject = `${kind === "application" ? "Application" : "Website enquiry"} — ${reference}`;
  const lines = Object.entries(payload)
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}: ${String(v)}`);
  const body = [
    `Reference: ${reference}`,
    "School: Leaders International School",
    "",
    ...lines,
    "",
    "Sent from the LIS website. Please reply to this address.",
  ].join("\n");
  return `mailto:${DEFAULT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Shared status UI + submit plumbing for the application and enquiry forms (supports Node API, cPanel PHP, and client fallback). */
export function useSubmit(endpoint: string) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: Record<string, unknown>) {
    setPending(true);
    setError(null);
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Fallback to PHP endpoint directly on static cPanel hosting if rewrite didn't catch /api/submit
      if ((res.status === 404 || res.status === 405) && endpoint === "/api/submit") {
        res = await fetch("/api/submit.php", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = (await res.json()) as SubmitResult & { error?: string };
        if (!res.ok) throw new Error(data.error ?? "The office could not receive your message.");
        setResult(data);
        return data;
      }

      // Client-side fallback if neither Node nor PHP runtime is active
      const reference = `LIS-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const fallback: SubmitResult = {
        status: "email",
        reference,
        mailto: buildClientMailto(payload, reference),
        message: "Please click the button below to send your details by email — everything is pre-filled for you.",
      };
      setResult(fallback);
      return fallback;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setPending(false);
    }
  }

  return { pending, result, error, submit, reset: () => { setResult(null); setError(null); } };
}

export function FormStatus({ result, pending }: { result: SubmitResult | null; pending: boolean }) {
  if (!result) return null;
  const copy = {
    cms: { icon: "check", tone: "border-sky-200 bg-sky-50", title: "Received — the admissions desk has your form." },
    email: { icon: "mail", tone: "border-gold-300 bg-gold-50", title: "Almost done — one more click to send." },
    queued: { icon: "check", tone: "border-sky-200 bg-sky-50", title: "Saved on this device." },
  }[result.status];
  return (
    <div className={cx("mt-6 rounded-2xl border p-5", copy.tone)} role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <span className="icon-chip !h-10 !w-10"><Icon name={copy.icon} size={18} /></span>
        <div className="min-w-0">
          <p className="font-display text-[1rem] font-bold text-navy-900">{copy.title}</p>
          {result.reference ? <p className="mt-1 text-[.88rem] text-slate-body">Your reference: <strong className="font-semibold text-navy-800">{result.reference}</strong></p> : null}
          {result.message ? <p className="mt-1 text-[.88rem] text-slate-body">{result.message}</p> : null}
          {result.status === "email" && result.mailto ? (
            <a href={result.mailto} className="btn btn-navy mt-3 !py-2 !text-[.85rem]" {...(pending ? {} : {})}>
              <Icon name="mail" size={15} /> Open my email app with the details
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
