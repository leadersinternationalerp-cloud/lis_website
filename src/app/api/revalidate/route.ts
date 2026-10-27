import { revalidatePath } from "next/cache";

/**
 * Ping this after publishing in the CMS so pages refresh immediately instead of
 * waiting for the 5-minute ISR window:
 *   curl -X POST "https://YOUR-APP.vercel.app/api/revalidate?secret=$REVALIDATE_SECRET"
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret") ?? request.headers.get("x-revalidate-secret") ?? "";
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return Response.json({ error: "Missing or invalid secret." }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
