import cfg from "./discord.json" assert { type: "json" };

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const webhook = cfg.discord.webhook.join("");

    const payload = JSON.parse(event.body);

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return {
      statusCode: res.ok ? 200 : res.status,
      body: res.ok ? "ok" : "discord error"
    };
  } catch (err) {
    return { statusCode: 500, body: "error" };
  }
}
