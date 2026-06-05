const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export async function captureEvent(event: string, distinctId: string, properties: Record<string, unknown>): Promise<string> {
  if (!apiKey) {
    return "no-key";
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
    return `${res.status}:${host}`;
  } catch (err) {
    return `error:${err}`;
  }
}
