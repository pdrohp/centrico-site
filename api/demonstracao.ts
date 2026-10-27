// Função da Vercel que recebe o formulário de demonstração (CtaFinal, na home e
// nas páginas de módulo, em PT e EN) e grava o pedido na base "Leads Centrico"
// do Notion (Espaço de Khipo). Fica fora do Astro: o site continua estático.
//
// Variáveis na Vercel: NOTION_TOKEN (integração com acesso à base) e, só se a
// base mudar, NOTION_DATA_SOURCE_ID.
//
// Regras: nunca responder sucesso se o Notion não confirmou; logs sem dados
// pessoais; honeypot + tempo mínimo contra bots; limite por IP (melhor esforço).

const NOTION_VERSION = '2026-03-11';
const DATA_SOURCE_PADRAO = '2449360e-d86f-49fe-82d3-0569d1941e92';
const IDIOMAS: Record<string, string> = { pt: 'Português', en: 'English' };

const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_IP = 5;
const porIp = new Map<string, number[]>();

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const richText = (conteudo: string) => ({
  rich_text: (conteudo.match(/[\s\S]{1,2000}/g) ?? []).map((parte) => ({ text: { content: parte } })),
});

export async function POST(request: Request): Promise<Response> {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return json(400, { ok: false, erro: 'formato' });
  }

  // Bot: honeypot preenchido ou envio rápido demais. Responde ok e descarta.
  const ts = Number(corpo._ts);
  if (texto(corpo._site, 200) || (Number.isFinite(ts) && Date.now() - ts < 2500)) return json(200, { ok: true });

  const agora = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'desconhecido';
  const hits = (porIp.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (hits.length >= MAX_POR_IP) return json(429, { ok: false, erro: 'limite' });
  porIp.set(ip, [...hits, agora]);

  const lead = {
    nome: texto(corpo.nome, 120),
    email: texto(corpo.email, 160).toLowerCase(),
    empresa: texto(corpo.empresa, 160),
    idioma: IDIOMAS[texto(corpo.idioma, 4)] ?? '',
    pagina: texto(corpo.pagina, 300),
    origem: texto(corpo.origem, 600),
  };

  const campos: string[] = [];
  if (lead.nome.length < 2) campos.push('nome');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) campos.push('email');
  if (lead.empresa.length < 2) campos.push('empresa');
  if (campos.length) return json(422, { ok: false, erro: 'validacao', campos });

  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.error('[demonstracao] NOTION_TOKEN não configurado; pedido não registrado.');
    return json(503, { ok: false, erro: 'destino_indisponivel' });
  }

  const properties: Record<string, unknown> = {
    Nome: { title: [{ text: { content: lead.nome } }] },
    'E-mail': { email: lead.email },
    Empresa: richText(lead.empresa),
    'Página': richText(lead.pagina),
    Origem: richText(lead.origem),
  };
  if (lead.idioma) properties.Idioma = { select: { name: lead.idioma } };

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { type: 'data_source_id', data_source_id: process.env.NOTION_DATA_SOURCE_ID || DATA_SOURCE_PADRAO },
        properties,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const erro = (await res.json().catch(() => ({}))) as { code?: string };
      console.error(`[demonstracao] Notion respondeu ${res.status} ${erro.code ?? ''}`);
      return json(502, { ok: false, erro: 'destino_falhou' });
    }
  } catch (err) {
    console.error(`[demonstracao] falha ao enviar ao Notion: ${(err as Error).name}`);
    return json(502, { ok: false, erro: 'destino_falhou' });
  }

  return json(200, { ok: true });
}
