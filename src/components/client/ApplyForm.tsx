"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FormStatus, useSubmit } from "./FormShell";
import { cx } from "@/lib/utils";

const STEPS = ["Student", "Family", "Placement"] as const;

const CLUBS = [
  { id: "Football / Sports", label: "Football / Sports", desc: "Pitch training, athletic skills & inter-school fixtures" },
  { id: "Robotics & Coding", label: "Robotics & Coding", desc: "Hands-on STEM, algorithms & electronics" },
  { id: "Music & Piano", label: "Music & Piano", desc: "Keyboard, vocal choir & music theory" },
  { id: "Science & Innovation", label: "Science & Innovation", desc: "Laboratory discovery & Young Scientists experiments" },
  { id: "Debate & Public Speaking", label: "Debate & Public Speaking", desc: "Oratory, parliamentary debate & critical thinking" },
];

type Data = {
  // Step 1: Student
  firstName: string;
  lastName: string;
  dob: string;
  gender: "Male" | "Female";
  placeOfBirth: string;
  nationality: string;
  idNumber: string;
  previousSchool: string;

  // Step 2: Family
  parentName: string;
  relationship: string;
  occupation: string;
  employer: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;

  hasGuardian2: boolean;
  guardian2Name: string;
  guardian2Relationship: string;
  guardian2Occupation: string;
  guardian2Employer: string;
  guardian2Phone: string;
  guardian2Email: string;

  // Step 3: Placement
  curriculum: "Cambridge" | "NECTA";
  applyingFor: string;
  startTerm: string;
  boarding: string;
  transport: string;
  clubs: string[];
  subjects: string;
  medical: string;
  additional: string;
  consent: boolean;
};

const EMPTY: Data = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Male",
  placeOfBirth: "Zanzibar",
  nationality: "Tanzanian",
  idNumber: "",
  previousSchool: "",

  parentName: "",
  relationship: "Mother",
  occupation: "",
  employer: "",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",

  hasGuardian2: false,
  guardian2Name: "",
  guardian2Relationship: "Father",
  guardian2Occupation: "",
  guardian2Employer: "",
  guardian2Phone: "",
  guardian2Email: "",

  curriculum: "Cambridge",
  applyingFor: "Cambridge Year 1",
  startTerm: "January 2027 Intake",
  boarding: "12 Equal Monthly Instalments",
  transport: "Yes, please send routes",
  clubs: ["Robotics & Coding"],
  subjects: "",
  medical: "",
  additional: "",
  consent: false,
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
      if (data.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a reachable phone number";
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
          Your application to start in <strong>{data.applyingFor}</strong> ({data.curriculum} Curriculum) has been recorded.
          The official 2027 Admission Form has been generated and dispatched to the admissions office at <strong>{admissionsEmail}</strong>.
        </p>
        <FormStatus result={result} pending={pending} />
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/resources#documents" className="btn btn-quiet"><Icon name="file" size={16} /> Documents to prepare</a>
          <button type="button" className="btn btn-navy" onClick={() => { setData(EMPTY); setStep(0); }}>
            {result.status === "email" ? "Send another" : "Start another application"}
          </button>
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
            <Field label="Student's first name" error={shown("firstName")}>
              <input value={data.firstName} onChange={set("firstName")} onBlur={blur("firstName")} placeholder="e.g. Amina" className="input" />
            </Field>
            <Field label="Surname" error={shown("lastName")}>
              <input value={data.lastName} onChange={set("lastName")} onBlur={blur("lastName")} placeholder="e.g. Juma" className="input" />
            </Field>
            <Field label="Date of birth" error={shown("dob")}>
              <input type="date" value={data.dob} onChange={set("dob")} onBlur={blur("dob")} className="input" />
            </Field>
            <Field label="Gender">
              <select value={data.gender} onChange={set("gender")} className="input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>
            <Field label="Nationality">
              <input value={data.nationality} onChange={set("nationality")} placeholder="Tanzanian" className="input" />
            </Field>
            <Field label="Place of birth">
              <input value={data.placeOfBirth} onChange={set("placeOfBirth")} placeholder="e.g. Zanzibar, Dar es Salaam" className="input" />
            </Field>
            <Field label="Birth cert. or passport number (optional)">
              <input value={data.idNumber} onChange={set("idNumber")} placeholder="Birth certificate / National ID / Passport" className="input" />
            </Field>
            <Field label="Current or previous school">
              <input value={data.previousSchool} onChange={set("previousSchool")} placeholder="Leave blank if first placement" className="input" />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Parent / guardian name" error={shown("parentName")}>
              <input value={data.parentName} onChange={set("parentName")} onBlur={blur("parentName")} placeholder="Full legal name" className="input" />
            </Field>
            <Field label="Relationship to student">
              <select value={data.relationship} onChange={set("relationship")} className="input">
                {["Mother", "Father", "Guardian", "Grandparent", "Other"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Occupation / profession (optional)">
              <input value={data.occupation} onChange={set("occupation")} placeholder="e.g. Civil Engineer, Accountant" className="input" />
            </Field>
            <Field label="Employer / organisation (optional)">
              <input value={data.employer} onChange={set("employer")} placeholder="e.g. Government, Hospital, Business" className="input" />
            </Field>
            <Field label="Email address" error={shown("email")}>
              <input type="email" value={data.email} onChange={set("email")} onBlur={blur("email")} placeholder="parent@example.com" className="input" />
            </Field>
            <Field label="Phone number" error={shown("phone")}>
              <input value={data.phone} onChange={set("phone")} onBlur={blur("phone")} placeholder="+255 7.." className="input" />
            </Field>
            <Field label="WhatsApp number (optional)">
              <input value={data.whatsapp} onChange={set("whatsapp")} placeholder="+255 7.." className="input" />
            </Field>
            <Field label="Home address / physical residence">
              <input value={data.address} onChange={set("address")} placeholder="e.g. Mazizini, Zanzibar" className="input" />
            </Field>

            {/* Secondary Parent / Guardian (Col 2 on PDF) */}
            <div className="lg:col-span-2 pt-2 border-t border-hairline">
              <button
                type="button"
                onClick={() => setData((d) => ({ ...d, hasGuardian2: !d.hasGuardian2 }))}
                className="flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-navy-950"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-100 text-navy-800 font-bold text-xs">
                  {data.hasGuardian2 ? "−" : "+"}
                </span>
                {data.hasGuardian2 ? "Remove secondary guardian details" : "Add second parent or emergency guardian (optional)"}
              </button>

              {data.hasGuardian2 && (
                <div className="grid gap-4 mt-4 lg:grid-cols-2 p-4 rounded-2xl border border-hairline bg-paper">
                  <Field label="Second parent / guardian name">
                    <input value={data.guardian2Name} onChange={set("guardian2Name")} placeholder="Full legal name" className="input" />
                  </Field>
                  <Field label="Relationship">
                    <select value={data.guardian2Relationship} onChange={set("guardian2Relationship")} className="input">
                      {["Father", "Mother", "Guardian", "Other"].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Phone number">
                    <input value={data.guardian2Phone} onChange={set("guardian2Phone")} placeholder="+255 7.." className="input" />
                  </Field>
                  <Field label="Email address (optional)">
                    <input type="email" value={data.guardian2Email} onChange={set("guardian2Email")} placeholder="parent2@example.com" className="input" />
                  </Field>
                  <Field label="Occupation (optional)">
                    <input value={data.guardian2Occupation} onChange={set("guardian2Occupation")} placeholder="Occupation" className="input" />
                  </Field>
                  <Field label="Employer (optional)">
                    <input value={data.guardian2Employer} onChange={set("guardian2Employer")} placeholder="Employer name" className="input" />
                  </Field>
                </div>
              )}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Curriculum wing">
              <select
                value={data.curriculum}
                onChange={(e) => {
                  const curr = e.target.value as "Cambridge" | "NECTA";
                  setData((d) => ({
                    ...d,
                    curriculum: curr,
                    applyingFor: curr === "Cambridge" ? "Cambridge Year 1" : "NECTA Grade 1",
                  }));
                }}
                className="input font-semibold text-navy-900"
              >
                <option value="Cambridge">Cambridge International Curriculum</option>
                <option value="NECTA">NECTA National Curriculum (Tanzania)</option>
              </select>
            </Field>

            <Field label="Class / Grade level applying for">
              <select value={data.applyingFor} onChange={set("applyingFor")} className="input">
                <optgroup label="Early Years">
                  <option>Baby Class</option>
                  <option>Nursery (KG1)</option>
                  <option>Nursery (KG2)</option>
                </optgroup>
                <optgroup label="Cambridge International Wing">
                  <option>Cambridge Year 1</option>
                  <option>Cambridge Year 2</option>
                  <option>Cambridge Year 3</option>
                  <option>Cambridge Year 4</option>
                  <option>Cambridge Year 5</option>
                  <option>Cambridge Year 6</option>
                </optgroup>
                <optgroup label="NECTA National Wing">
                  <option>NECTA Grade 1</option>
                  <option>NECTA Grade 2</option>
                  <option>NECTA Grade 3</option>
                  <option>NECTA Grade 4</option>
                  <option>NECTA Grade 5</option>
                  <option>NECTA Grade 6</option>
                </optgroup>
              </select>
            </Field>

            <Field label="Preferred start term">
              <select value={data.startTerm} onChange={set("startTerm")} className="input">
                {["January 2027 Intake", "Mid-term transfer", "September 2027"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Fee payment plan">
              <select value={data.boarding} onChange={set("boarding")} className="input">
                {["12 Equal Monthly Instalments", "Termly payments", "Full annual fee"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>

            <Field className="lg:col-span-2" label="School transport service">
              <select value={data.transport} onChange={set("transport")} className="input">
                {["Yes, please send routes & rates", "No, private family transport", "Not sure yet"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>

            {/* Clubs Checkboxes (Maps to Page 2 of official PDF) */}
            <div className="lg:col-span-2">
              <span className="block text-[.82rem] font-semibold text-navy-900 mb-2">
                Co-curricular Clubs & Activities (optional — select all that interest the student):
              </span>
              <div className="grid gap-2 sm:grid-cols-2">
                {CLUBS.map((club) => {
                  const isChecked = data.clubs.includes(club.id);
                  return (
                    <label
                      key={club.id}
                      className={cx(
                        "flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition text-left",
                        isChecked ? "border-navy-800 bg-navy-50/60" : "border-hairline bg-white hover:border-navy-300"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setData((d) => ({
                            ...d,
                            clubs: checked ? [...d.clubs, club.id] : d.clubs.filter((c) => c !== club.id),
                          }));
                        }}
                        className="mt-0.5 h-4 w-4 accent-[var(--color-navy-800)] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-xs text-navy-900">{club.label}</p>
                        <p className="text-[.76rem] text-slate-body mt-0.5 leading-snug">{club.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <Field className="lg:col-span-2" label="Medical conditions or learning support we should know about">
              <textarea rows={2} value={data.medical} onChange={set("medical")} placeholder="Allergies, medication, dietary needs, vision, hearing, speech..." className="input" />
            </Field>

            <Field className="lg:col-span-2" label="Additional notes for the admissions desk">
              <textarea rows={2} value={data.additional} onChange={set("additional")} placeholder="Any questions or special requests for the head teacher..." className="input" />
            </Field>

            <div className="lg:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-hairline bg-paper p-4">
                <input type="checkbox" checked={data.consent} onChange={set("consent")} className="mt-1 h-4 w-4 accent-[var(--color-navy-800)]" />
                <span className="text-[.9rem] leading-relaxed text-slate-body">
                  I confirm the information provided is accurate and declare my request for admission to Leaders International School. {shown("consent") ? <span className="mt-1 block font-semibold text-maroon-500">{errors.consent}</span> : null}
                </span>
              </label>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-hairline bg-paper px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-quiet !py-2.5 !text-[.88rem]">
              <Icon name="arrow-left" size={15} /> Back
            </button>
          ) : null}
          <p className="text-[.82rem] text-slate-body">Step {step + 1} of {STEPS.length} · official 2027 intake</p>
        </div>
        <div className="flex items-center gap-3">
          {error ? <p className="text-[.84rem] font-semibold text-maroon-500">{error}</p> : null}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="btn btn-navy group !py-2.5 !text-[.9rem]">
              Continue <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button type="submit" disabled={pending} className="btn btn-gold !py-2.5 !text-[.9rem] disabled:opacity-60">
              {pending ? "Sending & Generating Form…" : "Submit Admission Application"} <Icon name="check" size={15} />
            </button>
          )}
        </div>
      </div>
      <p className="border-t border-hairline px-6 py-4 text-[.8rem] text-slate-body lg:px-8">
        Need assistance? Email <a className="font-semibold text-navy-700 underline" href={`mailto:${admissionsEmail}`}>{admissionsEmail}</a> or call the admissions office — we will be delighted to guide you.
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
