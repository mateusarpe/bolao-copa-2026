const https = require('https');

// Horários de início dos jogos (Brasília) + duração estimada (110 min = 90min + intervalo + acréscimos)
const GAME_SCHEDULE = {
  A1:{start:"2026-06-11T16:00",dur:110}, A2:{start:"2026-06-11T23:00",dur:110},
  A3:{start:"2026-06-18T13:00",dur:110}, A4:{start:"2026-06-18T22:00",dur:110},
  A5:{start:"2026-06-24T22:00",dur:110}, A6:{start:"2026-06-24T22:00",dur:110},
  B1:{start:"2026-06-12T16:00",dur:110}, B2:{start:"2026-06-13T16:00",dur:110},
  B3:{start:"2026-06-18T16:00",dur:110}, B4:{start:"2026-06-18T19:00",dur:110},
  B5:{start:"2026-06-24T16:00",dur:110}, B6:{start:"2026-06-24T16:00",dur:110},
  C1:{start:"2026-06-13T19:00",dur:110}, C2:{start:"2026-06-13T22:00",dur:110},
  C3:{start:"2026-06-19T19:00",dur:110}, C4:{start:"2026-06-19T21:30",dur:110},
  C5:{start:"2026-06-24T19:00",dur:110}, C6:{start:"2026-06-24T19:00",dur:110},
  D1:{start:"2026-06-12T22:00",dur:110}, D2:{start:"2026-06-14T01:00",dur:110},
  D3:{start:"2026-06-20T00:00",dur:110}, D4:{start:"2026-06-19T16:00",dur:110},
  D5:{start:"2026-06-25T23:00",dur:110}, D6:{start:"2026-06-25T23:00",dur:110},
  E1:{start:"2026-06-14T14:00",dur:110}, E2:{start:"2026-06-14T20:00",dur:110},
  E3:{start:"2026-06-20T17:00",dur:110}, E4:{start:"2026-06-20T21:00",dur:110},
  E5:{start:"2026-06-25T17:00",dur:110}, E6:{start:"2026-06-25T17:00",dur:110},
  F1:{start:"2026-06-14T17:00",dur:110}, F2:{start:"2026-06-14T23:00",dur:110},
  F3:{start:"2026-06-20T23:00",dur:110}, F4:{start:"2026-06-20T14:00",dur:110},
  F5:{start:"2026-06-25T20:00",dur:110}, F6:{start:"2026-06-25T20:00",dur:110},
  G1:{start:"2026-06-15T16:00",dur:110}, G2:{start:"2026-06-15T22:00",dur:110},
  G3:{start:"2026-06-21T16:00",dur:110}, G4:{start:"2026-06-21T22:00",dur:110},
  G5:{start:"2026-06-27T00:00",dur:110}, G6:{start:"2026-06-27T00:00",dur:110},
  H1:{start:"2026-06-15T13:00",dur:110}, H2:{start:"2026-06-15T19:00",dur:110},
  H3:{start:"2026-06-21T13:00",dur:110}, H4:{start:"2026-06-21T19:00",dur:110},
  H5:{start:"2026-06-26T21:00",dur:110}, H6:{start:"2026-06-26T21:00",dur:110},
  I1:{start:"2026-06-16T16:00",dur:110}, I2:{start:"2026-06-16T19:00",dur:110},
  I3:{start:"2026-06-22T18:00",dur:110}, I4:{start:"2026-06-22T21:00",dur:110},
  I5:{start:"2026-06-26T16:00",dur:110}, I6:{start:"2026-06-26T16:00",dur:110},
  J1:{start:"2026-06-16T22:00",dur:110}, J2:{start:"2026-06-17T01:00",dur:110},
  J3:{start:"2026-06-22T14:00",dur:110}, J4:{start:"2026-06-23T00:00",dur:110},
  J5:{start:"2026-06-27T20:30",dur:110}, J6:{start:"2026-06-27T23:00",dur:110},
  K1:{start:"2026-06-17T14:00",dur:110}, K2:{start:"2026-06-17T21:00",dur:110},
  K3:{start:"2026-06-23T14:00",dur:110}, K4:{start:"2026-06-23T23:00",dur:110},
  K5:{start:"2026-06-27T20:30",dur:110}, K6:{start:"2026-06-27T20:30",dur:110},
  L1:{start:"2026-06-17T17:00",dur:110}, L2:{start:"2026-06-17T20:00",dur:110},
  L3:{start:"2026-06-23T17:00",dur:110}, L4:{start:"2026-06-23T20:00",dur:110},
  L5:{start:"2026-06-27T18:00",dur:110}, L6:{start:"2026-06-27T18:00",dur:110},
};

const GAME_NAMES = {
  A1:"México x África do Sul", A2:"Coreia do Sul x República Tcheca",
  A3:"República Tcheca x África do Sul", A4:"México x Coreia do Sul",
  A5:"República Tcheca x México", A6:"África do Sul x Coreia do Sul",
  B1:"Canadá x Bósnia", B2:"Catar x Suíça", B3:"Suíça x Bósnia",
  B4:"Canadá x Catar", B5:"Suíça x Canadá", B6:"Bósnia x Catar",
  C1:"Brasil x Marrocos", C2:"Haiti x Escócia", C3:"Escócia x Marrocos",
  C4:"Brasil x Haiti", C5:"Escócia x Brasil", C6:"Marrocos x Haiti",
  D1:"EUA x Paraguai", D2:"Austrália x Turquia", D3:"Turquia x Paraguai",
  D4:"EUA x Austrália", D5:"Turquia x EUA", D6:"Paraguai x Austrália",
  E1:"Alemanha x Curaçao", E2:"Costa do Marfim x Equador",
  E3:"Alemanha x Costa do Marfim", E4:"Equador x Curaçao",
  E5:"Equador x Alemanha", E6:"Curaçao x Costa do Marfim",
  F1:"Holanda x Japão", F2:"Suécia x Tunísia", F3:"Tunísia x Japão",
  F4:"Holanda x Suécia", F5:"Tunísia x Holanda", F6:"Japão x Suécia",
  G1:"Bélgica x Egito", G2:"Irã x Nova Zelândia", G3:"Bélgica x Irã",
  G4:"Nova Zelândia x Egito", G5:"Nova Zelândia x Bélgica", G6:"Egito x Irã",
  H1:"Espanha x Cabo Verde", H2:"Arábia Saudita x Uruguai",
  H3:"Espanha x Arábia Saudita", H4:"Uruguai x Cabo Verde",
  H5:"Uruguai x Espanha", H6:"Cabo Verde x Arábia Saudita",
  I1:"França x Senegal", I2:"Iraque x Noruega", I3:"França x Iraque",
  I4:"Noruega x Senegal", I5:"Noruega x França", I6:"Senegal x Iraque",
  J1:"Argentina x Argélia", J2:"Áustria x Jordânia", J3:"Argentina x Áustria",
  J4:"Jordânia x Argélia", J5:"Jordânia x Argentina", J6:"Argélia x Áustria",
  K1:"Portugal x RD Congo", K2:"Uzbequistão x Colômbia",
  K3:"Portugal x Uzbequistão", K4:"Colômbia x RD Congo",
  K5:"Colômbia x Portugal", K6:"RD Congo x Uzbequistão",
  L1:"Inglaterra x Croácia", L2:"Gana x Panamá", L3:"Inglaterra x Gana",
  L4:"Panamá x Croácia", L5:"Panamá x Inglaterra", L6:"Croácia x Gana",
};

function gameFinished(gameId) {
  const sched = GAME_SCHEDULE[gameId];
  if (!sched) return false;
  const start = new Date(sched.start + ':00-03:00'); // horário Brasília
  const end = new Date(start.getTime() + sched.dur * 60 * 1000);
  return new Date() > end;
}

function fetchUrl(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function searchGameScore(gameId, gameName) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const CX = process.env.GOOGLE_CX;
  if (!API_KEY || !CX) return null;

  const query = encodeURIComponent(`${gameName} Copa do Mundo 2026 placar resultado`);
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&num=3`;

  try {
    const raw = await fetchUrl({
      hostname: 'www.googleapis.com',
      path: `/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&num=3`,
      method: 'GET',
    });

    const data = JSON.parse(raw);
    const snippets = (data.items || []).map(i => i.snippet + ' ' + i.title).join(' ');

    // Extrair placar do tipo "2 x 1", "2-1", "2:1"
    const patterns = [
      /(\d+)\s*[x×\-:]\s*(\d+)/gi,
    ];

    for (const pattern of patterns) {
      const matches = [...snippets.matchAll(pattern)];
      if (matches.length > 0) {
        // Pegar o placar mais frequente
        const scores = matches.map(m => `${m[1]}-${m[2]}`);
        const freq = {};
        scores.forEach(s => freq[s] = (freq[s]||0) + 1);
        const best = Object.entries(freq).sort((a,b) => b[1]-a[1])[0][0];
        const [h, a] = best.split('-').map(Number);
        if (h >= 0 && h <= 20 && a >= 0 && a <= 20) {
          console.log(`[${gameId}] ${gameName}: ${h}x${a} (fonte: Google)`);
          return { h, a };
        }
      }
    }
  } catch(e) {
    console.error(`Erro buscando ${gameId}:`, e.message);
  }
  return null;
}

exports.handler = async function(event, context) {
  // Identificar quais jogos já terminaram e precisam de placar
  const finishedGames = Object.keys(GAME_SCHEDULE).filter(gameFinished);

  // Buscar no Google apenas jogos recentes (últimas 48h) que ainda não temos
  const recentCutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const toSearch = finishedGames.filter(id => {
    const sched = GAME_SCHEDULE[id];
    const end = new Date(new Date(sched.start + ':00-03:00').getTime() + sched.dur * 60 * 1000);
    return end > recentCutoff; // só busca os das últimas 48h para economizar quota
  });

  console.log(`Jogos terminados: ${finishedGames.length}, para buscar: ${toSearch.length}`);

  const results = {};

  // Buscar em paralelo (máx 3 simultâneos para não sobrecarregar)
  for (let i = 0; i < toSearch.length; i += 3) {
    const batch = toSearch.slice(i, i + 3);
    const batchResults = await Promise.all(
      batch.map(id => searchGameScore(id, GAME_NAMES[id]))
    );
    batch.forEach((id, idx) => {
      if (batchResults[idx]) results[id] = batchResults[idx];
    });
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'max-age=60', // cache 1 minuto
    },
    body: JSON.stringify({
      results,
      searched: toSearch,
      finished: finishedGames,
      timestamp: new Date().toISOString(),
    })
  };
};
