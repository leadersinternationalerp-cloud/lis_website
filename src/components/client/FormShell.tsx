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

/** Shared status UI + submit plumbing for the application and enquiry forms. */
export function useSubmit(endpoint: string) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: Record<string, unknown>) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as SubmitResult & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "The office could not receive your message.");
      setResult(data);
      return data;
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
    cms: { icon: "check", tone: "border-navy-200 bg-navy-50", title: "Received — the admissions desk has your form." },
    email: { icon: "mail", tone: "border-gold-300 bg-gold-50", title: "Almost done — one more click to send." },
    queued: { icon: "check", tone: "border-navy-200 bg-navy-50", title: "Saved on this device." },
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
