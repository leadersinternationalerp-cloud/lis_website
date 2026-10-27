"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FormStatus, useSubmit } from "./FormShell";

export function EnquiryForm({ officeEmail }: { officeEmail: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "Admissions enquiry", message: "", best: "Phone call" });
  const { pending, result, error, submit } = useSubmit("/api/submit");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (result) {
    return (
      <div className="card p-7 lg:p-8">
        <span className="icon-chip icon-chip--gold"><Icon name="check" size={22} /></span>
        <h3 className="mt-4 font-display text-[1.25rem] font-bold text-navy-900">Message received, {form.name.split(" ")[0] || "thank you"}.</h3>
        <p className="mt-2 text-[.95rem] leading-relaxed text-slate-body">Someone from the office reads this every morning before 09:00 and will reply within one working day.</p>
        <FormStatus result={result} pending={pending} />
        <button type="button" onClick={() => setForm({ ...form, message: "" })} className="btn btn-quiet mt-6 !py-2 !text-[.86rem]">Send another message</button>
      </div>
    );
  }

  return (
    <form className="card p-6 lg:p-8" onSubmit={(e) => { e.preventDefault(); void submit({ kind: "enquiry", ...form }); }}>
      <h3 className="font-display text-[1.35rem] font-bold text-navy-900">Send the office a message</h3>
      <p className="mt-1.5 text-[.92rem] text-slate-body">We read this inbox every morning before 09:00.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Your name</span><input className="input" required value={form.name} onChange={set("name")} placeholder="Asha Msigwa" /></label>
        <label className="field"><span>Email</span><input className="input" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" /></label>
        <label className="field"><span>Phone / WhatsApp</span><input className="input" value={form.phone} onChange={set("phone")} placeholder="+255 7.." /></label>
        <label className="field"><span>What is it about?</span>
          <select className="input" value={form.topic} onChange={set("topic")}>
            {["Admissions enquiry", "Open Day visit", "Fees & bursaries", "Transport", "Class teacher / concern", "Careers at LIS", "Something else"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="field sm:col-span-2"><span>Message</span><textarea className="input" rows={5} required value={form.message} onChange={set("message")} placeholder="Tell us who you are and what you need — a class and a term helps us answer faster." /></label>
        <fieldset className="field sm:col-span-2">
          <legend className="font-display text-[.8rem] font-semibold text-navy-800">How should we reply?</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {["Phone call", "Email", "WhatsApp"].map((m) => (
              <label key={m} className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[.85rem] font-semibold transition ${form.best === m ? "border-navy-800 bg-navy-800 text-white" : "border-hairline bg-white text-navy-700 hover:bg-navy-50"}`}>
                <input type="radio" name="best" className="sr-only" checked={form.best === m} onChange={() => setForm((f) => ({ ...f, best: m }))} />
                {m}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      {error ? <p className="mt-4 text-[.88rem] font-semibold text-maroon-500">{error}</p> : null}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-gold disabled:opacity-60">{pending ? "Sending…" : "Send message"} <Icon name="arrow-right" size={16} /></button>
        <a href={`mailto:${officeEmail}`} className="inline-flex items-center gap-2 text-[.88rem] font-semibold text-navy-700 transition hover:text-navy-900">
          <Icon name="mail" size={15} /> or email {officeEmail}
        </a>
      </div>
    </form>
  );
}
