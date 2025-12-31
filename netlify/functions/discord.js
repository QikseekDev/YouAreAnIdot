import cfg from "./discord.json" assert { type: "json" };

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Allow": "POST" },
      body: "Method Not Allowed"
    };
  }

  try {
    const webhook = cfg.discord.webhook; // use the string directly
    const payload = JSON.parse(event.body);

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return {
      statusCode: res.ok ? 200 : res.status,
      body: res.ok ? "ok" : `discord error: ${res.statusText}`,
      headers: { "Access-Control-Allow-Origin": "*" } // allow frontend to call it
    };
  } catch (err) {
    console.error(err); // log actual error in Netlify logs
    return {
      statusCode: 500,
      body: `Internal Server Error: ${err.message}`,
      headers: { "Access-Control-Allow-Origin": "*" }
    };
  }
}
