// Rotina diária: faz uma leitura simples no banco para o plano gratuito do Supabase não pausar.
export default async function handler(req, res) {
  try {
    const r = await fetch("https://ptwqiqjignhfzxooyudc.supabase.co" + "/rest/v1/ping?select=id&limit=1", {
      headers: { apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d3FpcWppZ25oZnp4b295dWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NjQ0NTQsImV4cCI6MjEwNjQ0MDQ1NH0.p9X_xwP06jRByuCO14e14o9g4Bl9YQA3KbHlzs7Wa2o", Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d3FpcWppZ25oZnp4b295dWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NjQ0NTQsImV4cCI6MjEwNjQ0MDQ1NH0.p9X_xwP06jRByuCO14e14o9g4Bl9YQA3KbHlzs7Wa2o" }
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, at: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
}
