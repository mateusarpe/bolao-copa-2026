const https = require('https');

const GAME_SCHEDULE = {
  A1:"2026-06-11T16:00",A2:"2026-06-11T23:00",A3:"2026-06-18T13:00",A4:"2026-06-18T22:00",A5:"2026-06-24T22:00",A6:"2026-06-24T22:00",
  B1:"2026-06-12T16:00",B2:"2026-06-13T16:00",B3:"2026-06-18T16:00",B4:"2026-06-18T19:00",B5:"2026-06-24T16:00",B6:"2026-06-24T16:00",
  C1:"2026-06-13T19:00",C2:"2026-06-13T22:00",C3:"2026-06-19T19:00",C4:"2026-06-19T21:30",C5:"2026-06-24T19:00",C6:"2026-06-24T19:00",
  D1:"2026-06-12T22:00",D2:"2026-06-14T01:00",D3:"2026-06-20T00:00",D4:"2026-06-19T16:00",D5:"2026-06-25T23:00",D6:"2026-06-25T23:00",
  E1:"2026-06-14T14:00",E2:"2026-06-14T20:00",E3:"2026-06-20T17:00",E4:"2026-06-20T21:00",E5:"2026-06-25T17:00",E6:"2026-06-25T17:00",
  F1:"2026-06-14T17:00",F2:"2026-06-14T23:00",F3:"2026-06-20T23:00",F4:"2026-06-20T14:00",F5:"2026-06-25T20:00",F6:"2026-06-25T20:00",
  G1:"2026-06-15T16:00",G2:"2026-06-15T22:00",G3:"2026-06-21T16:00",G4:"2026-06-21T22:00",G5:"2026-06-27T00:00",G6:"2026-06-27T00:00",
  H1:"2026-06-15T13:00",H2:"2026-06-15T19:00",H3:"2026-06-21T13:00",H4:"2026-06-21T19:00",H5:"2026-06-26T21:00",H6:"2026-06-26T21:00",
  I1:"2026-06-16T16:00",I2:"2026-06-16T19:00",I3:"2026-06-22T18:00",I4:"2026-06-22T21:00",I5:"2026-06-26T16:00",I6:"2026-06-26T16:00",
  J1:"2026-06-16T22:00",J2:"2026-06-17T01:00",J3:"2026-06-22T14:00",J4:"2026-06-23T00:00",J5:"2026-06-27T20:30",J6:"2026-06-27T23:00",
  K1:"2026-06-17T14:00",K2:"2026-06-17T21:00",K3:"2026-06-23T14:00",K4:"2026-06-23T23:00",K5:"2026-06-27T20:30",K6:"2026-06-27T20:30",
  L1:"2026-06-17T17:00",L2:"2026-06-17T20:00",L3:"2026-06-23T17:00",L4:"2026-06-23T20:00",L5:"2026-06-27T18:00",L6:"2026-06-27T18:00",
};

const GAME_NAMES = {
  A1:"México África do Sul",A2:"Coreia do Sul República Tcheca",A3:"República Tcheca África do Sul",A4:"México Coreia do Sul",A5:"República Tcheca México",A6:"África do Sul Coreia do Sul",
  B1:"Canadá Bósnia",B2:"Catar Suíça",B3:"Suíça Bósnia",B4:"Canadá Catar",B5:"Suíça Canadá",B6:"Bósnia Catar",
  C1:"Brasil Marrocos",C2:"Haiti Escócia",C3:"Escócia Marrocos",C4:"Brasil Haiti",C5:"Escócia Brasil",C6:"Marrocos Haiti",
  D1:"EUA Paraguai",D2:"Austrália Turquia",D3:"Turquia Paraguai",D4:"EUA Austrália",D5:"Turquia EUA",D6:"Paraguai Austrália",
  E1:"Alemanha Curaçao",E2:"Costa do Marfim Equador",E3:"Alemanha Costa do Marfim",E4:"Equador Curaçao",E5:"Equador Alemanha",E6:"Curaçao Costa do Marfim",
  F1:"Holanda Japão",F2:"Suécia Tunísia",F3:"Tunísia Japão",F4:"Holanda Suécia",F5:"Tunísia Holanda",F6:"Japão Suécia",
  G1:"Bélgica Egito",G2:"Irã Nova Zelândia",G3:"Bélgica Irã",G4:"Nova Zelândia Egito",G5:"Nova Zelândia Bélgica",G6:"Egito Irã",
  H1:"Espanha Cabo Verde",H2:"Arábia Saudita Uruguai",H3:"Espanha Arábia Saudita",H4:"Uruguai Cabo Verde",H5:"Uruguai Espanha",H6:"Cabo Verde Arábia Saudita",
  I1:"França Senegal",I2:"Iraque Noruega",I3:"França Iraque",I4:"Noruega Senegal",I5:"Noruega França",I6:"Senegal Iraque",
  J1:"Argentina Argélia",J2:"Áustria Jordânia",J3:"Argentina Áustria",J4:"Jordânia Argélia",J5:"Jordânia Argentina",J6:"Argélia Áustria",
  K1:"Portugal RD Congo",K2:"Uzbequistão Colômbia",K3:"Portugal Uzbequistão",K4:"Colômbia RD Congo",K5:"Colômbia Portugal",K6:"RD Congo Uzbequistão",
  L1:"Inglaterra Croácia",L2:"Gana Panamá",L3:"Inglaterra Gana",L4:"Panamá Croácia",L5:"Panamá Inglaterra",L6:"Croácia Gana",
};

function gameFinished(gameId) {
  const start = GAME_SCHEDULE[gameId];
  if (!start) return false;
  const startTime = new Date(start + ':00-03:00');
  const endTime = new Date(startTime.getTime() + 115 * 60 * 1000); // 115 min margem
  return new Date() > endTime;
}

function fetchUrl(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

function extractScore(text) {
  // Vários padrões para extrair placar
  const patterns = [
    /(\d+)\s*[-–x×:]\s*(\d+)/g,
    /(\d+)\s+a\s+(\d+)/gi,
    /placar[:\s]+(\d+)[^\d]+(\d+)/gi,
    /resultado[:\s]+(\d+)[^\d]+(\d+)/gi,
  ];

  const scores = [];
  for (const pattern of patterns) {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(text)) !== null) {
      const h = parseInt(match[1]);
      const a = parseInt(match[2]);
      if (h >= 0 && h <= 15 && a >= 0 && a <= 15) {
        scores.push(`${h}-${a}`);
      }
    }
  }

  if (scores.length === 0) return null;

  // Pegar o mais frequente
  const freq = {};
  scores.forEach(s => freq[s] = (freq[s] || 0) + 1);
  const best = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  const [h, a] = best.split('-').map(Number);
  return { h, a };
}

async function searchScore(gameId, gameName) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const CX = process.env.GOOGLE_CX;
  if (!API_KEY || !CX) return null;

  try {
    const query = encodeURIComponent(`${gameName} Copa do Mundo 2026 placar`);
    const path = `/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&num=5&lr=lang_pt`;
    const raw = await fetchUrl('www.googleapis.com', path);
    const data = JSON.parse(raw);

    if (data.error) {
      console.error(`Google API error: ${data.error.message}`);
      return null;
    }

    const items = data.items || [];
    // Juntar título + snippet de todos os resultados
    const allText = items.map(i => `${i.title} ${i.snippet}`).join(' ');
    console.log(`[${gameId}] Texto: ${allText.substring(0, 200)}`);

    const score = extractScore(allText);
    if (score) {
      console.log(`[${gameId}] Placar encontrado: ${score.h}x${score.a}`);
    } else {
      console.log(`[${gameId}] Nenhum placar encontrado`);
    }
    return score;
  } catch(e) {
    console.error(`Erro ${gameId}:`, e.message);
    return null;
  }
}

exports.handler = async function(event, context) {
  // Buscar apenas jogos das últimas 24h que já terminaram
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const toSearch = Object.keys(GAME_SCHEDULE).filter(id => {
    if (!gameFinished(id)) return false;
    const start = new Date(GAME_SCHEDULE[id] + ':00-03:00');
    return start > cutoff;
  });

  console.log(`Buscando placares para: ${toSearch.join(', ')}`);

  const results = {};

  // Processar um por vez para não exceder quota
  for (const id of toSearch) {
    const score = await searchScore(id, GAME_NAMES[id]);
    if (score) results[id] = score;
    // Pequena pausa entre requests
    await new Promise(r => setTimeout(r, 200));
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'max-age=120',
    },
    body: JSON.stringify({ results, searched: toSearch, timestamp: new Date().toISOString() })
  };
};
