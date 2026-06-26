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
  A1:"México x África do Sul",A2:"Coreia do Sul x Rep. Tcheca",A3:"Rep. Tcheca x África do Sul",A4:"México x Coreia do Sul",A5:"Rep. Tcheca x México",A6:"África do Sul x Coreia do Sul",
  B1:"Canadá x Bósnia",B2:"Catar x Suíça",B3:"Suíça x Bósnia",B4:"Canadá x Catar",B5:"Suíça x Canadá",B6:"Bósnia x Catar",
  C1:"Brasil x Marrocos",C2:"Haiti x Escócia",C3:"Escócia x Marrocos",C4:"Brasil x Haiti",C5:"Escócia x Brasil",C6:"Marrocos x Haiti",
  D1:"EUA x Paraguai",D2:"Austrália x Turquia",D3:"Turquia x Paraguai",D4:"EUA x Austrália",D5:"Turquia x EUA",D6:"Paraguai x Austrália",
  E1:"Alemanha x Curaçao",E2:"Costa do Marfim x Equador",E3:"Alemanha x Costa do Marfim",E4:"Equador x Curaçao",E5:"Equador x Alemanha",E6:"Curaçao x Costa do Marfim",
  F1:"Holanda x Japão",F2:"Suécia x Tunísia",F3:"Tunísia x Japão",F4:"Holanda x Suécia",F5:"Tunísia x Holanda",F6:"Japão x Suécia",
  G1:"Bélgica x Egito",G2:"Irã x Nova Zelândia",G3:"Bélgica x Irã",G4:"Nova Zelândia x Egito",G5:"Nova Zelândia x Bélgica",G6:"Egito x Irã",
  H1:"Espanha x Cabo Verde",H2:"Arábia Saudita x Uruguai",H3:"Espanha x Arábia Saudita",H4:"Uruguai x Cabo Verde",H5:"Uruguai x Espanha",H6:"Cabo Verde x Arábia Saudita",
  I1:"França x Senegal",I2:"Iraque x Noruega",I3:"França x Iraque",I4:"Noruega x Senegal",I5:"Noruega x França",I6:"Senegal x Iraque",
  J1:"Argentina x Argélia",J2:"Áustria x Jordânia",J3:"Argentina x Áustria",J4:"Jordânia x Argélia",J5:"Jordânia x Argentina",J6:"Argélia x Áustria",
  K1:"Portugal x RD Congo",K2:"Uzbequistão x Colômbia",K3:"Portugal x Uzbequistão",K4:"Colômbia x RD Congo",K5:"Colômbia x Portugal",K6:"RD Congo x Uzbequistão",
  L1:"Inglaterra x Croácia",L2:"Gana x Panamá",L3:"Inglaterra x Gana",L4:"Panamá x Croácia",L5:"Panamá x Inglaterra",L6:"Croácia x Gana",
};

function gameFinished(gameId) {
  const start = GAME_SCHEDULE[gameId];
  if (!start) return false;
  const startTime = new Date(start + ':00-03:00');
  const endTime = new Date(startTime.getTime() + 120 * 60 * 1000);
  return new Date() > endTime;
}

function callAnthropic(body) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(bodyStr),
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(bodyStr);
    req.end();
  });
}

exports.handler = async function(event, context) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada' }) };
  }

  // Jogos encerrados nas últimas 48h
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const finished = Object.keys(GAME_SCHEDULE).filter(id => {
    if (!gameFinished(id)) return false;
    const start = new Date(GAME_SCHEDULE[id] + ':00-03:00');
    return start > cutoff;
  });

  if (finished.length === 0) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ results: {}, searched: [], timestamp: new Date().toISOString() })
    };
  }

  const gamesList = finished.map(id => `${id}: ${GAME_NAMES[id]}`).join('\n');
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  try {
    const response = await callAnthropic({
      model: 'claude-haiku-4-5',
      max_tokens: 1000,
      system: `Você tem acesso a informações em tempo real sobre a Copa do Mundo 2026.
Retorne APENAS um objeto JSON com os placares finais dos jogos solicitados.
Formato: {"A1":{"h":2,"a":0},"B1":{"h":1,"a":1}}
Onde "h" é gols do time da casa e "a" é gols do visitante.
Se não souber o placar de algum jogo, omita ele do JSON.
Retorne APENAS o JSON, sem texto adicional, sem markdown.`,
      messages: [{
        role: 'user',
        content: `Data/hora atual em Brasília: ${now}

Quais são os placares FINAIS destes jogos da Copa do Mundo 2026 que já foram disputados?

${gamesList}

Retorne APENAS o JSON com os placares que você conhece.`
      }]
    });

    const text = response.content && response.content[0] && response.content[0].text;
    if (!text) throw new Error('Resposta vazia da API');

    const clean = text.replace(/```json|```/g, '').trim();
    const results = JSON.parse(clean);

    console.log('Resultados obtidos:', JSON.stringify(results));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=60',
      },
      body: JSON.stringify({ results, searched: finished, timestamp: new Date().toISOString() })
    };

  } catch(e) {
    console.error('Erro:', e.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message, results: {} })
    };
  }
};
