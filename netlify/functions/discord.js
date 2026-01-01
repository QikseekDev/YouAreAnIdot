import cfg from "./discord.json" assert { type: "json" };

export async function handler(event) {
  if (event.httpMethod === "GET") {
    // Serve the webhook URL to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ webhook: cfg.discord.webhook }),
      headers: { "Access-Control-Allow-Origin": "*" }
    };
  }

  if (event.httpMethod === "POST") {
    // Optional: allow direct posting through Netlify (not necessary now)
    try {
      const webhook = cfg.discord.webhook;
      const payload = JSON.parse(event.body);

      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      return {
        statusCode: res.ok ? 200 : res.status,
        body: res.ok ? "ok" : `discord error: ${res.statusText}`,
        headers: { "Access-Control-Allow-Origin": "*" }
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: `Internal Server Error: ${err.message}`,
        headers: { "Access-Control-Allow-Origin": "*" }
      };
    }
  }

  return {
    statusCode: 405,
    headers: { "Allow": "GET, POST" },
    body: "Method Not Allowed"
  };
}
