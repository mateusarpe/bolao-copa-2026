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

// Queries em inglês funcionam melhor no Google
const GAME_QUERIES = {
  A1:"Mexico vs South Africa World Cup 2026 score",
  A2:"South Korea vs Czech Republic World Cup 2026 score",
  A3:"Czech Republic vs South Africa World Cup 2026 score",
  A4:"Mexico vs South Korea World Cup 2026 score",
  A5:"Czech Republic vs Mexico World Cup 2026 score",
  A6:"South Africa vs South Korea World Cup 2026 score",
  B1:"Canada vs Bosnia World Cup 2026 score",
  B2:"Qatar vs Switzerland World Cup 2026 score",
  B3:"Switzerland vs Bosnia World Cup 2026 score",
  B4:"Canada vs Qatar World Cup 2026 score",
  B5:"Switzerland vs Canada World Cup 2026 score",
  B6:"Bosnia vs Qatar World Cup 2026 score",
  C1:"Brazil vs Morocco World Cup 2026 score",
  C2:"Haiti vs Scotland World Cup 2026 score",
  C3:"Scotland vs Morocco World Cup 2026 score",
  C4:"Brazil vs Haiti World Cup 2026 score",
  C5:"Scotland vs Brazil World Cup 2026 score",
  C6:"Morocco vs Haiti World Cup 2026 score",
  D1:"USA vs Paraguay World Cup 2026 score",
  D2:"Australia vs Turkey World Cup 2026 score",
  D3:"Turkey vs Paraguay World Cup 2026 score",
  D4:"USA vs Australia World Cup 2026 score",
  D5:"Turkey vs USA World Cup 2026 score",
  D6:"Paraguay vs Australia World Cup 2026 score",
  E1:"Germany vs Curacao World Cup 2026 score",
  E2:"Ivory Coast vs Ecuador World Cup 2026 score",
  E3:"Germany vs Ivory Coast World Cup 2026 score",
  E4:"Ecuador vs Curacao World Cup 2026 score",
  E5:"Ecuador vs Germany World Cup 2026 score",
  E6:"Curacao vs Ivory Coast World Cup 2026 score",
  F1:"Netherlands vs Japan World Cup 2026 score",
  F2:"Sweden vs Tunisia World Cup 2026 score",
  F3:"Tunisia vs Japan World Cup 2026 score",
  F4:"Netherlands vs Sweden World Cup 2026 score",
  F5:"Tunisia vs Netherlands World Cup 2026 score",
  F6:"Japan vs Sweden World Cup 2026 score",
  G1:"Belgium vs Egypt World Cup 2026 score",
  G2:"Iran vs New Zealand World Cup 2026 score",
  G3:"Belgium vs Iran World Cup 2026 score",
  G4:"New Zealand vs Egypt World Cup 2026 score",
  G5:"New Zealand vs Belgium World Cup 2026 score",
  G6:"Egypt vs Iran World Cup 2026 score",
  H1:"Spain vs Cape Verde World Cup 2026 score",
  H2:"Saudi Arabia vs Uruguay World Cup 2026 score",
  H3:"Spain vs Saudi Arabia World Cup 2026 score",
  H4:"Uruguay vs Cape Verde World Cup 2026 score",
  H5:"Uruguay vs Spain World Cup 2026 score",
  H6:"Cape Verde vs Saudi Arabia World Cup 2026 score",
  I1:"France vs Senegal World Cup 2026 score",
  I2:"Iraq vs Norway World Cup 2026 score",
  I3:"France vs Iraq World Cup 2026 score",
  I4:"Norway vs Senegal World Cup 2026 score",
  I5:"Norway vs France World Cup 2026 score",
  I6:"Senegal vs Iraq World Cup 2026 score",
  J1:"Argentina vs Algeria World Cup 2026 score",
  J2:"Austria vs Jordan World Cup 2026 score",
  J3:"Argentina vs Austria World Cup 2026 score",
  J4:"Jordan vs Algeria World Cup 2026 score",
  J5:"Jordan vs Argentina World Cup 2026 score",
  J6:"Algeria vs Austria World Cup 2026 score",
  K1:"Portugal vs DR Congo World Cup 2026 score",
  K2:"Uzbekistan vs Colombia World Cup 2026 score",
  K3:"Portugal vs Uzbekistan World Cup 2026 score",
  K4:"Colombia vs DR Congo World Cup 2026 score",
  K5:"Colombia vs Portugal World Cup 2026 score",
  K6:"DR Congo vs Uzbekistan World Cup 2026 score",
  L1:"England vs Croatia World Cup 2026 score",
  L2:"Ghana vs Panama World Cup 2026 score",
  L3:"England vs Ghana World Cup 2026 score",
  L4:"Panama vs Croatia World Cup 2026 score",
  L5:"Panama vs England World Cup 2026 score",
  L6:"Croatia vs Ghana World Cup 2026 score",
};

function gameFinished(gameId) {
  const start = GAME_SCHEDULE[gameId];
  if (!start) return false;
  const startTime = new Date(start + ':00-03:00');
  const endTime = new Date(startTime.getTime() + 120 * 60 * 1000);
  return new Date() > endTime;
}

function fetchUrl(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname, path, method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

function extractScore(text) {
  // Limpar texto
  const clean = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');

  // Padrões mais específicos para placares de futebol
  const patterns = [
    /(\d{1,2})\s*[-–]\s*(\d{1,2})/g,      // 1-4, 5-0
    /(\d{1,2})\s*×\s*(\d{1,2})/g,          // 1×4
    /score[d]?[:\s]+(\d{1,2})[^\d]+(\d{1,2})/gi,
    /result[:\s]+(\d{1,2})[^\d]+(\d{1,2})/gi,
    /won\s+(\d{1,2})[^\d]+(\d{1,2})/gi,
    /(\d{1,2})\s+goals?\s+to\s+(\d{1,2})/gi,
    /FT[:\s]+(\d{1,2})[^\d]+(\d{1,2})/gi,  // FT: 1-4
    /full.?time[:\s]+(\d{1,2})[^\d]+(\d{1,2})/gi,
  ];

  const scores = [];
  for (const pattern of patterns) {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(clean)) !== null) {
      const h = parseInt(match[1]);
      const a = parseInt(match[2]);
      if (h >= 0 && h <= 15 && a >= 0 && a <= 15) {
        scores.push(`${h}-${a}`);
      }
    }
  }

  if (scores.length === 0) return null;

  const freq = {};
  scores.forEach(s => freq[s] = (freq[s] || 0) + 1);
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  console.log('Scores encontrados:', sorted.slice(0,5));

  const [h, a] = sorted[0][0].split('-').map(Number);
  return { h, a };
}

async function searchScore(gameId) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const CX = process.env.GOOGLE_CX;
  if (!API_KEY || !CX) return null;

  const query = encodeURIComponent(GAME_QUERIES[gameId] || gameId);
  const path = `/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&num=5`;

  try {
    const res = await fetchUrl('www.googleapis.com', path);
    console.log(`[${gameId}] Status: ${res.status}`);

    const data = JSON.parse(res.body);

    if (data.error) {
      console.error(`[${gameId}] API Error: ${data.error.code} - ${data.error.message}`);
      return null;
    }

    if (!data.items || data.items.length === 0) {
      console.log(`[${gameId}] Sem resultados`);
      return null;
    }

    // Juntar título + snippet + metatags
    const allText = data.items.map(item => {
      const meta = item.pagemap && item.pagemap.metatags
        ? item.pagemap.metatags.map(m => Object.values(m).join(' ')).join(' ')
        : '';
      return `${item.title} ${item.snippet} ${meta}`;
    }).join(' | ');

    console.log(`[${gameId}] Texto (200): ${allText.substring(0, 200)}`);

    const score = extractScore(allText);
    console.log(`[${gameId}] Resultado: ${score ? `${score.h}-${score.a}` : 'não encontrado'}`);
    return score;

  } catch(e) {
    console.error(`[${gameId}] Erro:`, e.message);
    return null;
  }
}

exports.handler = async function(event, context) {
  // Buscar jogos das últimas 36h que já terminaram
  const cutoff = new Date(Date.now() - 36 * 60 * 60 * 1000);
  const toSearch = Object.keys(GAME_SCHEDULE).filter(id => {
    if (!gameFinished(id)) return false;
    const start = new Date(GAME_SCHEDULE[id] + ':00-03:00');
    return start > cutoff;
  });

  console.log(`Buscando: ${toSearch.join(', ')}`);

  const results = {};
  const errors = {};

  for (const id of toSearch) {
    const score = await searchScore(id);
    if (score) {
      results[id] = score;
    } else {
      errors[id] = 'não encontrado';
    }
    await new Promise(r => setTimeout(r, 300));
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      results,
      searched: toSearch,
      errors,
      timestamp: new Date().toISOString()
    })
  };
};
