"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FormStatus, useSubmit } from "./FormShell";
import { cx } from "@/lib/utils";

const STEPS = ["Student", "Family", "Placement"] as const;
const CLASSES = [
  "Baby Class",
  "Nursery (KG1)",
  "Nursery (KG2)",
  "NECTA Grade 1",
  "NECTA Grade 2",
  "NECTA Grade 3",
  "NECTA Grade 4",
  "NECTA Grade 5",
  "NECTA Grade 6",
  "Cambridge Year 1",
  "Cambridge Year 2",
  "Cambridge Year 3",
  "Cambridge Year 4",
  "Cambridge Year 5",
  "Cambridge Year 6",
];

type Data = {
  firstName: string; lastName: string; dob: string; nationality: string; previousSchool: string;
  parentName: string; relationship: string; email: string; phone: string; whatsapp: string; address: string;
  applyingFor: string; startTerm: string; boarding: string; transport: string; subjects: string;
  medical: string; additional: string; consent: boolean;
};

const EMPTY: Data = {
  firstName: "", lastName: "", dob: "", nationality: "Tanzanian", previousSchool: "",
  parentName: "", relationship: "Mother", email: "", phone: "", whatsapp: "", address: "",
  applyingFor: "NECTA Grade 1", startTerm: "January 2027 Intake", boarding: "12 Equal Monthly Instalments", transport: "Yes, please send routes",
  subjects: "", medical: "", additional: "", consent: false,
};

export function ApplyForm({ admissionsEmail }: { admissionsEmail: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { pending, result, error, submit } = useSubmit("/api/submit");

  const set = (key: keyof Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setData((d) => ({ ...d, [key]: target.type === "checkbox" ? target.checked : target.value }));
  };

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Data, string>> = {};
    if (step === 0) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim()) e.lastName = "Required";
      if (!data.dob) e.dob = "Required";
    }
    if (step === 1) {
      if (!data.parentName.trim()) e.parentName = "Required";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "Enter a valid email";
      if (data.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a reachable number";
    }
    if (step === 2 && !data.consent) e.consent = "Please confirm before sending";
    return e;
  }, [data, step]);

  const stepValid = Object.keys(errors).length === 0;

  if (result) {
    return (
      <div className="card p-8 lg:p-10">
        <span className="icon-chip icon-chip--gold"><Icon name="check" size={22} /></span>
        <h2 className="h2 mt-5 text-navy-900">Thank you, {data.firstName || "family"}.</h2>
        <p className="lead mt-3 max-w-xl">
          Your application to start in {data.applyingFor} has been recorded. The admissions desk replies within
          five working days with the assessment date and what to bring.
        </p>
        <FormStatus result={result} pending={pending} />
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/resources#documents" className="btn btn-quiet"><Icon name="file" size={16} /> Documents to prepare</a>
          <button type="button" className="btn btn-navy" onClick={() => { setData(EMPTY); setStep(0); }}>{result.status === "email" ? "Send another" : "Start another application"}</button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="card overflow-hidden"
      onSubmit={async (e) => {
        e.preventDefault();
        setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
        if (!stepValid) return;
        await submit({ kind: "application", ...data });
      }}
    >
      {/* progress */}
      <div className="border-b border-hairline bg-paper px-6 py-5 lg:px-8">
        <ol className="flex flex-wrap items-center gap-3">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(i)}
                className={cx("flex items-center gap-2.5 rounded-full px-3 py-1.5 font-display text-[.85rem] font-semibold transition", i === step ? "bg-navy-800 text-white" : "bg-white text-navy-600 hover:bg-navy-50")}
              >
                <span className={cx("grid h-5 w-5 place-items-center rounded-full text-[.68rem] font-bold", i === step ? "bg-gold-400 text-navy-900" : i < step ? "bg-navy-800 text-white" : "bg-navy-100 text-navy-500")}>
                  {i < step ? <Icon name="check" size={11} strokeWidth={3} /> : i + 1}
                </span>
                {label}
              </button>
              {i < STEPS.length - 1 ? <span className="hidden h-px w-8 bg-navy-200 sm:block" /> : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2 lg:gap-6 lg:p-8">
        {step === 0 ? (
          <>
            <Field label="Student's first name" error={shown("firstName")}><input value={data.firstName} onChange={set("firstName")} onBlur={blur("firstName")} placeholder="Amina" className="input" /></Field>
            <Field label="Surname" error={shown("lastName")}><input value={data.lastName} onChange={set("lastName")} onBlur={blur("lastName")} placeholder="Juma" className="input" /></Field>
            <Field label="Date of birth"><input type="date" value={data.dob} onChange={set("dob")} className="input" /></Field>
            <Field label="Nationality"><input value={data.nationality} onChange={set("nationality")} className="input" /></Field>
            <Field className="lg:col-span-2" label="Current or previous school"><input value={data.previousSchool} onChange={set("previousSchool")} placeholder="Leave blank if this is a first placement" className="input" /></Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Parent / guardian name" error={shown("parentName")}><input value={data.parentName} onChange={set("parentName")} onBlur={blur("parentName")} className="input" /></Field>
            <Field label="Relationship">
              <select value={data.relationship} onChange={set("relationship")} className="input">
                {["Mother", "Father", "Guardian", "Grandparent", "Other"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Email" error={shown("email")}><input type="email" value={data.email} onChange={set("email")} onBlur={blur("email")} placeholder="you@example.com" className="input" /></Field>
            <Field label="Phone" error={shown("phone")}><input value={data.phone} onChange={set("phone")} onBlur={blur("phone")} placeholder="+255 7.." className="input" /></Field>
            <Field label="WhatsApp number (optional)"><input value={data.whatsapp} onChange={set("whatsapp")} placeholder="+255 7.." className="input" /></Field>
            <Field label="Home address / nearest landmark"><input value={data.address} onChange={set("address")} placeholder="Kisakasaka, near the mosque" className="input" /></Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Applying for">
              <select value={data.applyingFor} onChange={set("applyingFor")} className="input">
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Preferred start">
              <select value={data.startTerm} onChange={set("startTerm")} className="input">
                {["January 2027 Intake", "Mid-term transfer", "September 2027"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Fee payment plan">
              <select value={data.boarding} onChange={set("boarding")} className="input">
                {["12 Equal Monthly Instalments", "Termly payments", "Full annual fee"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="School transport">
              <select value={data.transport} onChange={set("transport")} className="input">
                {["Yes, please send routes", "No, we drive", "Not sure yet"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field className="lg:col-span-2" label="Curriculum wing & child's interests (optional)"><input value={data.subjects} onChange={set("subjects")} placeholder="e.g. Cambridge Wing, NECTA Wing, Robotics, Reading, Football…" className="input" /></Field>
            <Field className="lg:col-span-2" label="Medical or learning support we should know about"><textarea rows={3} value={data.medical} onChange={set("medical")} placeholder="Allergies, medication, vision, speech therapy…" className="input" /></Field>
            <Field className="lg:col-span-2" label="Anything else you would like the head teacher to know"><textarea rows={3} value={data.additional} onChange={set("additional")} className="input" /></Field>
            <div className="lg:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-hairline bg-paper p-4">
                <input type="checkbox" checked={data.consent} onChange={set("consent")} className="mt-1 h-4 w-4 accent-[var(--color-navy-800)]" />
                <span className="text-[.9rem] leading-relaxed text-slate-body">
                  I confirm the information is accurate and allow Leaders International School to contact me about this
                  application. {shown("consent") ? <span className="mt-1 block font-semibold text-maroon-500">{errors.consent}</span> : null}
                </span>
              </label>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-hairline bg-paper px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-quiet !py-2.5 !text-[.88rem]"><Icon name="arrow-left" size={15} /> Back</button>
          ) : null}
          <p className="text-[.82rem] text-slate-body">Step {step + 1} of {STEPS.length} · no fee, takes about 6 minutes</p>
        </div>
        <div className="flex items-center gap-3">
          {error ? <p className="text-[.84rem] font-semibold text-maroon-500">{error}</p> : null}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="btn btn-navy group !py-2.5 !text-[.9rem]">
              Continue <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button type="submit" disabled={pending} className="btn btn-gold !py-2.5 !text-[.9rem] disabled:opacity-60">
              {pending ? "Sending…" : "Send application"} <Icon name="check" size={15} />
            </button>
          )}
        </div>
      </div>
      <p className="border-t border-hairline px-6 py-4 text-[.8rem] text-slate-body lg:px-8">
        Prefer paper? Email <a className="font-semibold text-navy-700 underline" href={`mailto:${admissionsEmail}`}>{admissionsEmail}</a> or call the office — we will fill it in with you.
      </p>
    </form>
  );

  function shown(key: keyof Data) {
    return touched[key] && errors[key];
  }
  function blur(key: keyof Data) {
    return () => setTouched((t) => ({ ...t, [key]: true }));
  }
}

function Field({ label, error, children, className }: { label: string; error?: string | false; children: React.ReactNode; className?: string }) {
  return (
    <label className={cx("field", className)}>
      <span className="flex items-baseline justify-between">
        {label}
        {error ? <span className="text-[.72rem] font-semibold text-maroon-500">{error}</span> : null}
      </span>
      {children}
    </label>
  );
}
