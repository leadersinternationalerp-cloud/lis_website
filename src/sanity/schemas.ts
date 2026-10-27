import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Content types for the school. Editors work in /studio:
 *  - Photo        → the gallery grid (drag PNG/JPG into the asset picker)
 *  - News article → /news and the home page preview
 *  - Resource     → /resources downloads (PDF, DOCX, XLSX…)
 *  - Application  → written by the /apply form when a write token is configured
 *  - Enquiry      → written by the contact form
 * The site keeps /content/*.json as the fallback for anything not published yet.
 */

const altField = defineField({ name: "alt", type: "string", title: "Alt text" });

const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Caption title" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", type: "text", rows: 2 }),
    defineField({ name: "album", type: "string", options: { list: ["campus", "science", "sport", "culture", "library"], layout: "radio" } }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first" }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

const news = defineType({
  name: "news",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", options: { list: ["Admissions", "Academics", "School Life", "Results", "Resources", "Notice"] } }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "excerpt", type: "text", rows: 3, description: "Shown on cards and in search results" }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [altField] }),
    defineField({ name: "featured", type: "boolean", description: "Show on the home page" }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        defineArrayMember({ name: "inlineImage", type: "image", options: { hotspot: true }, fields: [altField] }),
        defineArrayMember({
          name: "callout",
          type: "object",
          fields: [defineField({ name: "text", type: "text" }), defineField({ name: "author", type: "string" })],
          preview: { select: { title: "text" } },
        }),
      ],
    }),
  ],
});

const resource = defineType({
  name: "resource",
  title: "Document / download",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "file",
      type: "file",
      options: { accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.png,.jpg" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", type: "string", options: { list: ["Admissions", "Fees", "Calendar", "Parents", "Policies", "Academics", "Careers"] } }),
    defineField({ name: "type", type: "string", options: { list: ["pdf", "doc", "sheet", "slides", "image"] } }),
    defineField({ name: "size", type: "string", description: "e.g. 312 KB" }),
    defineField({ name: "updated", type: "date" }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

const application = defineType({
  name: "application",
  title: "Admission application",
  type: "document",
  fields: [
    defineField({ name: "reference", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
    defineField({ name: "status", type: "string", options: { list: ["New", "Assessment booked", "Offer made", "Enrolled", "Declined", "Archived"] } }),
    defineField({ name: "firstName", type: "string" }),
    defineField({ name: "lastName", type: "string" }),
    defineField({ name: "dob", type: "date" }),
    defineField({ name: "nationality", type: "string" }),
    defineField({ name: "previousSchool", type: "string" }),
    defineField({ name: "parentName", type: "string" }),
    defineField({ name: "relationship", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "applyingFor", type: "string" }),
    defineField({ name: "startTerm", type: "string" }),
    defineField({ name: "boarding", type: "string" }),
    defineField({ name: "transport", type: "string" }),
    defineField({ name: "subjects", type: "text" }),
    defineField({ name: "medical", type: "text" }),
    defineField({ name: "additional", type: "text" }),
    defineField({ name: "notes", type: "text", rows: 4, description: "Internal — not visible to the family" }),
  ],
  preview: {
    select: { surname: "lastName", firstname: "firstName" },
    prepare({ surname, firstname }) {
      return { title: [firstname, surname].filter(Boolean).join(" ") };
    },
  },
});

const enquiry = defineType({
  name: "enquiry",
  title: "Website enquiry",
  type: "document",
  fields: [
    defineField({ name: "reference", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
    defineField({ name: "status", type: "string", options: { list: ["New", "Answered", "Closed"] } }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "topic", type: "string" }),
    defineField({ name: "best", type: "string" }),
    defineField({ name: "message", type: "text", rows: 6 }),
  ],
});

/** Mounted in the Studio sidebar; also the list Sanity validates against. */
export const schemaTypes = [photo, news, resource, application, enquiry];

export default schemaTypes;
