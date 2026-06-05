const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export async function captureEvent(event: string, distinctId: string, properties: Record<string, unknown>) {
  if (!apiKey) {
    console.warn("[PostHog] No API key found — skipping");
    return;
  }

  try {
    const res = await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        distinct_id: distinctId,
        properties,
      }),
    });
    console.log("[PostHog] Capture response:", res.status);
  } catch (err) {
    console.error("[PostHog] Capture failed:", err);
  }
}
