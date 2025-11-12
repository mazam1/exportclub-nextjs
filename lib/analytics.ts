export function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  try {
    if (typeof window !== "undefined") {
      const dl = (window as any).dataLayer;
      if (Array.isArray(dl)) {
        dl.push({ event, ...payload });
        return;
      }
    }
    console.info("[analytics]", event, payload);
  } catch (err) {
    console.warn("[analytics] failed", { event, payload, err });
  }
}