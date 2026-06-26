const https = require('https');

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
    req.setTimeout(55000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(bodyStr);
    req.end();
  });
}

const GUESSES = {
  alex:          {A1:{h:2,a:0},A2:{h:1,a:0},A3:{h:0,a:2},A4:{h:2,a:2},A5:{h:0,a:3},A6:{h:1,a:1},B1:{h:1,a:1},B2:{h:0,a:3},B3:{h:2,a:0},B4:{h:1,a:0},B5:{h:1,a:1},B6:{h:1,a:0},C1:{h:2,a:0},C2:{h:0,a:1},C3:{h:0,a:2},C4:{h:3,a:0},C5:{h:0,a:2},C6:{h:2,a:0},D1:{h:0,a:1},D2:{h:0,a:2},D3:{h:1,a:1},D4:{h:1,a:0},D5:{h:0,a:1},D6:{h:2,a:0},E1:{h:3,a:0},E2:{h:2,a:0},E3:{h:1,a:1},E4:{h:2,a:0},E5:{h:0,a:2},E6:{h:0,a:2},F1:{h:2,a:2},F2:{h:2,a:0},F3:{h:0,a:3},F4:{h:2,a:1},F5:{h:1,a:2},F6:{h:2,a:0},G1:{h:2,a:0},G2:{h:1,a:1},G3:{h:2,a:0},G4:{h:0,a:0},G5:{h:0,a:3},G6:{h:1,a:0},H1:{h:4,a:0},H2:{h:2,a:2},H3:{h:2,a:1},H4:{h:2,a:0},H5:{h:1,a:3},H6:{h:0,a:2},I1:{h:1,a:1},I2:{h:0,a:0},I3:{h:2,a:0},I4:{h:0,a:2},I5:{h:0,a:3},I6:{h:2,a:0},J1:{h:3,a:0},J2:{h:1,a:1},J3:{h:2,a:0},J4:{h:0,a:1},J5:{h:0,a:2},J6:{h:1,a:1},K1:{h:3,a:0},K2:{h:0,a:2},K3:{h:2,a:0},K4:{h:2,a:0},K5:{h:2,a:2},K6:{h:0,a:0},L1:{h:1,a:1},L2:{h:1,a:1},L3:{h:2,a:0},L4:{h:0,a:2},L5:{h:0,a:3},L6:{h:2,a:1}},
  alicia:        {A1:{h:2,a:0},A2:{h:1,a:1},A3:{h:2,a:0},A4:{h:1,a:1},A5:{h:1,a:2},A6:{h:0,a:2},B1:{h:1,a:1},B2:{h:0,a:1},B3:{h:2,a:0},B4:{h:3,a:0},B5:{h:1,a:1},B6:{h:2,a:0},C1:{h:2,a:1},C2:{h:0,a:3},C3:{h:0,a:1},C4:{h:4,a:0},C5:{h:1,a:2},C6:{h:2,a:0},D1:{h:2,a:1},D2:{h:2,a:1},D3:{h:0,a:1},D4:{h:3,a:1},D5:{h:1,a:1},D6:{h:2,a:0},E1:{h:3,a:0},E2:{h:1,a:1},E3:{h:2,a:0},E4:{h:2,a:0},E5:{h:1,a:2},E6:{h:0,a:2},F1:{h:2,a:0},F2:{h:1,a:0},F3:{h:0,a:2},F4:{h:2,a:2},F5:{h:1,a:3},F6:{h:1,a:1},G1:{h:2,a:1},G2:{h:2,a:0},G3:{h:1,a:1},G4:{h:0,a:3},G5:{h:0,a:2},G6:{h:1,a:1},H1:{h:3,a:0},H2:{h:0,a:2},H3:{h:4,a:1},H4:{h:2,a:0},H5:{h:1,a:2},H6:{h:1,a:1},I1:{h:3,a:1},I2:{h:0,a:2},I3:{h:3,a:0},I4:{h:1,a:1},I5:{h:1,a:2},I6:{h:2,a:0},J1:{h:3,a:1},J2:{h:2,a:0},J3:{h:2,a:1},J4:{h:0,a:2},J5:{h:0,a:2},J6:{h:1,a:1},K1:{h:3,a:0},K2:{h:0,a:2},K3:{h:2,a:0},K4:{h:2,a:1},K5:{h:2,a:3},K6:{h:1,a:1},L1:{h:2,a:1},L2:{h:1,a:1},L3:{h:2,a:0},L4:{h:0,a:1},L5:{h:0,a:3},L6:{h:2,a:0}},
  cacia:         {A1:{h:1,a:2},A2:{h:2,a:2},A3:{h:2,a:1},A4:{h:2,a:3},A5:{h:0,a:1},A6:{h:2,a:2},B1:{h:2,a:1},B2:{h:1,a:1},B3:{h:2,a:1},B4:{h:4,a:1},B5:{h:3,a:3},B6:{h:1,a:1},C1:{h:2,a:1},C2:{h:1,a:2},C3:{h:2,a:3},C4:{h:3,a:0},C5:{h:2,a:3},C6:{h:3,a:1},D1:{h:2,a:2},D2:{h:1,a:1},D3:{h:1,a:2},D4:{h:2,a:2},D5:{h:1,a:3},D6:{h:3,a:2},E1:{h:3,a:1},E2:{h:1,a:2},E3:{h:2,a:0},E4:{h:2,a:0},E5:{h:0,a:2},E6:{h:0,a:2},F1:{h:2,a:1},F2:{h:3,a:1},F3:{h:0,a:2},F4:{h:2,a:2},F5:{h:0,a:2},F6:{h:2,a:3},G1:{h:3,a:3},G2:{h:1,a:1},G3:{h:0,a:0},G4:{h:1,a:1},G5:{h:0,a:3},G6:{h:2,a:1},H1:{h:4,a:0},H2:{h:1,a:3},H3:{h:2,a:0},H4:{h:2,a:0},H5:{h:3,a:3},H6:{h:1,a:1},I1:{h:2,a:1},I2:{h:1,a:2},I3:{h:3,a:1},I4:{h:2,a:2},I5:{h:1,a:3},I6:{h:1,a:1},J1:{h:2,a:0},J2:{h:1,a:1},J3:{h:3,a:1},J4:{h:0,a:0},J5:{h:1,a:2},J6:{h:0,a:1},K1:{h:2,a:1},K2:{h:0,a:2},K3:{h:3,a:1},K4:{h:2,a:0},K5:{h:2,a:2},K6:{h:1,a:1},L1:{h:4,a:3},L2:{h:2,a:1},L3:{h:3,a:0},L4:{h:1,a:3},L5:{h:0,a:2},L6:{h:3,a:1}},
  cecilia:       {A1:{h:3,a:0},A2:{h:1,a:1},A3:{h:2,a:0},A4:{h:2,a:1},A5:{h:0,a:4},A6:{h:0,a:1},B1:{h:3,a:0},B2:{h:0,a:3},B3:{h:4,a:0},B4:{h:2,a:0},B5:{h:0,a:0},B6:{h:1,a:2},C1:{h:2,a:1},C2:{h:0,a:2},C3:{h:0,a:3},C4:{h:4,a:0},C5:{h:1,a:3},C6:{h:1,a:2},D1:{h:3,a:2},D2:{h:1,a:1},D3:{h:0,a:1},D4:{h:3,a:0},D5:{h:0,a:4},D6:{h:3,a:0},E1:{h:5,a:0},E2:{h:1,a:2},E3:{h:2,a:1},E4:{h:3,a:0},E5:{h:0,a:2},E6:{h:0,a:2},F1:{h:3,a:1},F2:{h:2,a:0},F3:{h:1,a:2},F4:{h:2,a:2},F5:{h:0,a:4},F6:{h:1,a:0},G1:{h:4,a:0},G2:{h:1,a:1},G3:{h:2,a:0},G4:{h:0,a:0},G5:{h:0,a:3},G6:{h:0,a:1},H1:{h:6,a:0},H2:{h:0,a:3},H3:{h:4,a:0},H4:{h:2,a:0},H5:{h:2,a:2},H6:{h:1,a:1},I1:{h:5,a:0},I2:{h:0,a:3},I3:{h:3,a:0},I4:{h:2,a:0},I5:{h:1,a:2},I6:{h:2,a:0},J1:{h:2,a:1},J2:{h:0,a:0},J3:{h:1,a:0},J4:{h:1,a:3},J5:{h:0,a:3},J6:{h:0,a:2},K1:{h:4,a:0},K2:{h:0,a:2},K3:{h:3,a:1},K4:{h:2,a:0},K5:{h:1,a:2},K6:{h:0,a:0},L1:{h:0,a:0},L2:{h:1,a:0},L3:{h:2,a:1},L4:{h:0,a:3},L5:{h:0,a:2},L6:{h:1,a:1}},
  jonas:         {A1:{h:3,a:0},A2:{h:1,a:2},A3:{h:2,a:1},A4:{h:0,a:0},A5:{h:1,a:1},A6:{h:1,a:1},B1:{h:2,a:0},B2:{h:1,a:3},B3:{h:3,a:0},B4:{h:2,a:1},B5:{h:2,a:2},B6:{h:1,a:2},C1:{h:2,a:0},C2:{h:1,a:1},C3:{h:1,a:2},C4:{h:3,a:0},C5:{h:1,a:2},C6:{h:2,a:1},D1:{h:2,a:2},D2:{h:2,a:2},D3:{h:1,a:3},D4:{h:2,a:1},D5:{h:1,a:2},D6:{h:2,a:2},E1:{h:4,a:0},E2:{h:1,a:1},E3:{h:4,a:1},E4:{h:2,a:2},E5:{h:1,a:1},E6:{h:0,a:1},F1:{h:2,a:1},F2:{h:1,a:0},F3:{h:0,a:2},F4:{h:1,a:2},F5:{h:0,a:3},F6:{h:3,a:2},G1:{h:3,a:1},G2:{h:0,a:0},G3:{h:2,a:0},G4:{h:0,a:1},G5:{h:0,a:3},G6:{h:1,a:1},H1:{h:3,a:0},H2:{h:0,a:3},H3:{h:2,a:0},H4:{h:2,a:0},H5:{h:2,a:2},H6:{h:2,a:1},I1:{h:2,a:0},I2:{h:1,a:1},I3:{h:2,a:0},I4:{h:1,a:1},I5:{h:0,a:2},I6:{h:1,a:1},J1:{h:3,a:0},J2:{h:1,a:1},J3:{h:3,a:0},J4:{h:1,a:1},J5:{h:0,a:2},J6:{h:1,a:1},K1:{h:3,a:1},K2:{h:0,a:2},K3:{h:3,a:0},K4:{h:2,a:2},K5:{h:1,a:3},K6:{h:1,a:1},L1:{h:2,a:2},L2:{h:2,a:2},L3:{h:3,a:1},L4:{h:1,a:1},L5:{h:1,a:4},L6:{h:2,a:1}},
  lucas:         {A1:{h:3,a:1},A2:{h:1,a:1},A3:{h:2,a:2},A4:{h:1,a:1},A5:{h:1,a:1},A6:{h:3,a:2},B1:{h:3,a:2},B2:{h:2,a:3},B3:{h:2,a:2},B4:{h:2,a:2},B5:{h:1,a:1},B6:{h:2,a:1},C1:{h:4,a:1},C2:{h:2,a:1},C3:{h:2,a:2},C4:{h:3,a:0},C5:{h:1,a:2},C6:{h:1,a:2},D1:{h:4,a:2},D2:{h:3,a:2},D3:{h:2,a:2},D4:{h:3,a:2},D5:{h:1,a:3},D6:{h:1,a:2},E1:{h:3,a:0},E2:{h:0,a:2},E3:{h:2,a:1},E4:{h:2,a:1},E5:{h:1,a:2},E6:{h:0,a:2},F1:{h:2,a:1},F2:{h:3,a:2},F3:{h:1,a:1},F4:{h:2,a:2},F5:{h:2,a:1},F6:{h:1,a:2},G1:{h:3,a:1},G2:{h:1,a:2},G3:{h:2,a:0},G4:{h:2,a:1},G5:{h:2,a:3},G6:{h:2,a:1},H1:{h:3,a:0},H2:{h:0,a:1},H3:{h:2,a:0},H4:{h:2,a:1},H5:{h:1,a:2},H6:{h:2,a:2},I1:{h:2,a:1},I2:{h:2,a:3},I3:{h:2,a:0},I4:{h:3,a:1},I5:{h:2,a:2},I6:{h:1,a:1},J1:{h:3,a:1},J2:{h:2,a:1},J3:{h:2,a:0},J4:{h:2,a:2},J5:{h:1,a:2},J6:{h:1,a:0},K1:{h:3,a:1},K2:{h:1,a:2},K3:{h:2,a:0},K4:{h:3,a:1},K5:{h:1,a:2},K6:{h:2,a:1},L1:{h:2,a:1},L2:{h:0,a:2},L3:{h:2,a:2},L4:{h:1,a:2},L5:{h:2,a:1},L6:{h:2,a:2}},
  mateus:        {A1:{h:2,a:1},A2:{h:1,a:0},A3:{h:1,a:1},A4:{h:2,a:0},A5:{h:0,a:2},A6:{h:1,a:1},B1:{h:1,a:0},B2:{h:0,a:2},B3:{h:1,a:0},B4:{h:1,a:0},B5:{h:2,a:1},B6:{h:0,a:0},C1:{h:2,a:1},C2:{h:0,a:1},C3:{h:0,a:3},C4:{h:3,a:0},C5:{h:0,a:4},C6:{h:3,a:0},D1:{h:1,a:2},D2:{h:2,a:0},D3:{h:0,a:3},D4:{h:1,a:1},D5:{h:2,a:2},D6:{h:3,a:2},E1:{h:3,a:0},E2:{h:0,a:2},E3:{h:2,a:0},E4:{h:3,a:2},E5:{h:1,a:3},E6:{h:0,a:0},F1:{h:2,a:2},F2:{h:1,a:2},F3:{h:0,a:3},F4:{h:3,a:0},F5:{h:0,a:2},F6:{h:3,a:0},G1:{h:3,a:0},G2:{h:1,a:1},G3:{h:2,a:1},G4:{h:1,a:1},G5:{h:0,a:2},G6:{h:0,a:0},H1:{h:4,a:0},H2:{h:0,a:2},H3:{h:2,a:0},H4:{h:3,a:0},H5:{h:2,a:2},H6:{h:0,a:0},I1:{h:3,a:0},I2:{h:0,a:0},I3:{h:3,a:1},I4:{h:2,a:2},I5:{h:2,a:3},I6:{h:0,a:0},J1:{h:3,a:0},J2:{h:1,a:1},J3:{h:2,a:1},J4:{h:0,a:0},J5:{h:1,a:3},J6:{h:1,a:1},K1:{h:2,a:0},K2:{h:1,a:2},K3:{h:3,a:0},K4:{h:2,a:2},K5:{h:2,a:3},K6:{h:1,a:1},L1:{h:2,a:1},L2:{h:1,a:1},L3:{h:3,a:0},L4:{h:0,a:3},L5:{h:0,a:2},L6:{h:2,a:1}},
  tiago:         {A1:{h:1,a:1},A2:{h:2,a:0},A3:{h:1,a:1},A4:{h:3,a:1},A5:{h:1,a:0},A6:{h:0,a:2},B1:{h:2,a:0},B2:{h:0,a:2},B3:{h:1,a:0},B4:{h:3,a:1},B5:{h:1,a:1},B6:{h:2,a:2},C1:{h:1,a:1},C2:{h:0,a:1},C3:{h:1,a:2},C4:{h:4,a:0},C5:{h:0,a:2},C6:{h:3,a:1},D1:{h:1,a:2},D2:{h:0,a:4},D3:{h:1,a:1},D4:{h:3,a:0},D5:{h:1,a:1},D6:{h:3,a:0},E1:{h:6,a:0},E2:{h:1,a:2},E3:{h:2,a:0},E4:{h:3,a:0},E5:{h:1,a:0},E6:{h:0,a:1},F1:{h:2,a:2},F2:{h:1,a:1},F3:{h:0,a:1},F4:{h:2,a:0},F5:{h:0,a:3},F6:{h:2,a:1},G1:{h:2,a:1},G2:{h:1,a:1},G3:{h:3,a:0},G4:{h:1,a:1},G5:{h:0,a:2},G6:{h:2,a:2},H1:{h:3,a:0},H2:{h:0,a:1},H3:{h:2,a:0},H4:{h:3,a:1},H5:{h:2,a:2},H6:{h:0,a:0},I1:{h:3,a:1},I2:{h:0,a:3},I3:{h:4,a:0},I4:{h:3,a:2},I5:{h:0,a:2},I6:{h:1,a:0},J1:{h:2,a:0},J2:{h:1,a:1},J3:{h:3,a:0},J4:{h:1,a:1},J5:{h:0,a:2},J6:{h:1,a:1},K1:{h:3,a:0},K2:{h:0,a:2},K3:{h:2,a:0},K4:{h:1,a:0},K5:{h:0,a:0},K6:{h:1,a:1},L1:{h:0,a:0},L2:{h:1,a:1},L3:{h:1,a:0},L4:{h:1,a:2},L5:{h:0,a:3},L6:{h:2,a:1}},
  antonio_carlos:{A1:{h:2,a:0},A2:{h:2,a:1},A3:{h:1,a:1},A4:{h:1,a:1},A5:{h:1,a:1},A6:{h:1,a:1},B1:{h:1,a:1},B2:{h:1,a:1},B3:{h:0,a:0},B4:{h:0,a:0},B5:{h:0,a:0},B6:{h:0,a:0},C1:{h:2,a:1},C2:{h:1,a:2},C3:{h:1,a:1},C4:{h:1,a:1},C5:{h:0,a:0},C6:{h:1,a:1},D1:{h:4,a:1},D2:{h:1,a:0},D3:{h:1,a:1},D4:{h:1,a:1},D5:{h:1,a:1},D6:{h:1,a:1},E1:{h:0,a:0},E2:{h:0,a:0},E3:{h:0,a:0},E4:{h:0,a:0},E5:{h:0,a:0},E6:{h:0,a:0},F1:{h:1,a:1},F2:{h:1,a:1},F3:{h:1,a:1},F4:{h:1,a:1},F5:{h:1,a:1},F6:{h:1,a:1},G1:{h:0,a:0},G2:{h:0,a:0},G3:{h:0,a:0},G4:{h:0,a:0},G5:{h:0,a:0},G6:{h:0,a:0},H1:{h:1,a:1},H2:{h:1,a:1},H3:{h:1,a:1},H4:{h:1,a:1},H5:{h:1,a:1},H6:{h:1,a:1},I1:{h:0,a:0},I2:{h:0,a:0},I3:{h:1,a:1},I4:{h:1,a:1},I5:{h:1,a:1},I6:{h:0,a:0},J1:{h:0,a:0},J2:{h:0,a:0},J3:{h:1,a:1},J4:{h:1,a:1},J5:{h:0,a:0},J6:{h:0,a:0},K1:{h:1,a:1},K2:{h:1,a:1},K3:{h:1,a:1},K4:{h:1,a:1},K5:{h:0,a:0},K6:{h:0,a:0},L1:{h:1,a:1},L2:{h:1,a:1},L3:{h:1,a:1},L4:{h:1,a:1},L5:{h:1,a:1},L6:{h:1,a:1}},
  teresinha:     {A1:{h:2,a:0},A2:{h:2,a:1},A3:{h:0,a:0},A4:{h:2,a:0},A5:{h:1,a:1},A6:{h:0,a:1},B1:{h:1,a:1},B2:{h:1,a:1},B3:{h:0,a:0},B4:{h:2,a:1},B5:{h:2,a:1},B6:{h:0,a:0},C1:{h:2,a:1},C2:{h:0,a:1},C3:{h:1,a:0},C4:{h:2,a:1},C5:{h:0,a:2},C6:{h:0,a:1},D1:{h:4,a:1},D2:{h:2,a:1},D3:{h:0,a:0},D4:{h:2,a:1},D5:{h:1,a:2},D6:{h:0,a:2},E1:{h:2,a:1},E2:{h:3,a:0},E3:{h:3,a:1},E4:{h:0,a:1},E5:{h:1,a:3},E6:{h:0,a:0},F1:{h:2,a:2},F2:{h:1,a:0},F3:{h:1,a:3},F4:{h:0,a:2},F5:{h:0,a:2},F6:{h:2,a:0},G1:{h:1,a:0},G2:{h:1,a:0},G3:{h:0,a:1},G4:{h:2,a:1},G5:{h:2,a:2},G6:{h:1,a:0},H1:{h:2,a:1},H2:{h:1,a:1},H3:{h:2,a:1},H4:{h:2,a:1},H5:{h:2,a:2},H6:{h:1,a:1},I1:{h:2,a:1},I2:{h:1,a:0},I3:{h:2,a:1},I4:{h:1,a:1},I5:{h:1,a:2},I6:{h:1,a:1},J1:{h:2,a:0},J2:{h:2,a:1},J3:{h:2,a:2},J4:{h:1,a:1},J5:{h:1,a:2},J6:{h:0,a:1},K1:{h:2,a:0},K2:{h:1,a:0},K3:{h:2,a:1},K4:{h:0,a:1},K5:{h:0,a:2},K6:{h:0,a:1},L1:{h:2,a:0},L2:{h:1,a:1},L3:{h:1,a:2},L4:{h:2,a:0},L5:{h:1,a:2},L6:{h:0,a:1}},
};

const ANTES_C1 = new Set(['A1','A2','B1','D1','B2']);

function calcPoints(g, r) {
  if (!g || !r) return 0;
  if (g.h === r.h && g.a === r.a) return 3;
  const gw = g.h > g.a ? 'H' : g.h < g.a ? 'A' : 'D';
  const rw = r.h > r.a ? 'H' : r.h < r.a ? 'A' : 'D';
  return gw === rw ? 1 : 0;
}

function calcTotal(pid, results) {
  const g = GUESSES[pid]; if (!g) return 0;
  return Object.keys(results).reduce((sum, id) => {
    if (ANTES_C1.has(id) && (pid==='antonio_carlos'||pid==='teresinha')) return sum;
    return sum + calcPoints(g[id], results[id]);
  }, 0);
}

function getBRTDay() {
  const brt = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Sao_Paulo'}));
  if (brt.getHours() < 12) brt.setDate(brt.getDate()-1);
  return brt.toISOString().slice(0,10);
}

exports.handler = async function(event, context) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode:500, body: JSON.stringify({error:'API key não configurada'}) };
  }

  const today = getBRTDay();
  const now = new Date().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});

  // Buscar resultados via web_search
  const bodyStr = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    system: `Você é um assistente que busca resultados da Copa do Mundo 2026.
Use a ferramenta web_search para buscar os placares reais dos jogos.
Após buscar, retorne APENAS um JSON com os resultados confirmados.
Formato: {"results":{"I5":{"h":1,"a":4},"I6":{"h":5,"a":0}}}
IDs dos jogos:
A1=México×AfrSul, A2=Coreia×Tcheca, A3=Tcheca×AfrSul, A4=México×Coreia, A5=Tcheca×México, A6=AfrSul×Coreia
B1=Canadá×Bósnia, B2=Catar×Suíça, B3=Suíça×Bósnia, B4=Canadá×Catar, B5=Suíça×Canadá, B6=Bósnia×Catar
C1=Brasil×Marrocos, C2=Haiti×Escócia, C3=Escócia×Marrocos, C4=Brasil×Haiti, C5=Escócia×Brasil, C6=Marrocos×Haiti
D1=EUA×Paraguai, D2=Austrália×Turquia, D3=Turquia×Paraguai, D4=EUA×Austrália, D5=Turquia×EUA, D6=Paraguai×Austrália
E1=Alemanha×Curaçao, E2=CostaMarfim×Equador, E3=Alemanha×CostaMarfim, E4=Equador×Curaçao, E5=Equador×Alemanha, E6=Curaçao×CostaMarfim
F1=Holanda×Japão, F2=Suécia×Tunísia, F3=Tunísia×Japão, F4=Holanda×Suécia, F5=Tunísia×Holanda, F6=Japão×Suécia
G1=Bélgica×Egito, G2=Irã×NZelândia, G3=Bélgica×Irã, G4=NZelândia×Egito, G5=NZelândia×Bélgica, G6=Egito×Irã
H1=Espanha×CaboVerde, H2=ArábiaSaudita×Uruguai, H3=Espanha×ArábiaSaudita, H4=Uruguai×CaboVerde, H5=Uruguai×Espanha, H6=CaboVerde×ArábiaSaudita
I1=França×Senegal, I2=Iraque×Noruega, I3=França×Iraque, I4=Noruega×Senegal, I5=Noruega×França, I6=Senegal×Iraque
J1=Argentina×Argélia, J2=Áustria×Jordânia, J3=Argentina×Áustria, J4=Jordânia×Argélia, J5=Jordânia×Argentina, J6=Argélia×Áustria
K1=Portugal×RDCongo, K2=Uzbequistão×Colômbia, K3=Portugal×Uzbequistão, K4=Colômbia×RDCongo, K5=Colômbia×Portugal, K6=RDCongo×Uzbequistão
L1=Inglaterra×Croácia, L2=Gana×Panamá, L3=Inglaterra×Gana, L4=Panamá×Croácia, L5=Panamá×Inglaterra, L6=Croácia×Gana
Retorne APENAS o JSON final, sem markdown.`,
    messages: [{
      role: 'user',
      content: `Data/hora em Brasília: ${now}\n\nBusque na web os resultados FINAIS de todos os jogos da Copa do Mundo 2026 que já foram disputados até agora. Inclua todos os jogos encerrados. Retorne APENAS o JSON com os resultados.`
    }]
  });

  try {
    const response = await callAnthropic(JSON.parse(bodyStr));

    // Extrair o texto final da resposta (após usar web_search)
    let text = '';
    if (response.content) {
      for (const block of response.content) {
        if (block.type === 'text') text = block.text;
      }
    }

    let results = {};
    try {
      const clean = text.replace(/```json|```/g,'').trim();
      const parsed = JSON.parse(clean);
      results = parsed.results || parsed;
    } catch(e) {
      console.error('Parse error:', e.message, 'Text:', text.substring(0,200));
    }

    // Calcular delta do dia para cada participante
    const participants = Object.keys(GUESSES);
    const delta = {};
    participants.forEach(pid => {
      const g = GUESSES[pid];
      let d = 0;
      // Jogos de hoje (baseado na data BRT)
      Object.keys(results).forEach(id => {
        const gameDate = {
          A1:'2026-06-11',A2:'2026-06-11',A3:'2026-06-18',A4:'2026-06-18',A5:'2026-06-24',A6:'2026-06-24',
          B1:'2026-06-12',B2:'2026-06-13',B3:'2026-06-18',B4:'2026-06-18',B5:'2026-06-24',B6:'2026-06-24',
          C1:'2026-06-13',C2:'2026-06-13',C3:'2026-06-19',C4:'2026-06-19',C5:'2026-06-24',C6:'2026-06-24',
          D1:'2026-06-12',D2:'2026-06-14',D3:'2026-06-20',D4:'2026-06-19',D5:'2026-06-25',D6:'2026-06-25',
          E1:'2026-06-14',E2:'2026-06-14',E3:'2026-06-20',E4:'2026-06-20',E5:'2026-06-25',E6:'2026-06-25',
          F1:'2026-06-14',F2:'2026-06-14',F3:'2026-06-20',F4:'2026-06-20',F5:'2026-06-25',F6:'2026-06-25',
          G1:'2026-06-15',G2:'2026-06-15',G3:'2026-06-21',G4:'2026-06-21',G5:'2026-06-27',G6:'2026-06-27',
          H1:'2026-06-15',H2:'2026-06-15',H3:'2026-06-21',H4:'2026-06-21',H5:'2026-06-26',H6:'2026-06-26',
          I1:'2026-06-16',I2:'2026-06-16',I3:'2026-06-22',I4:'2026-06-22',I5:'2026-06-26',I6:'2026-06-26',
          J1:'2026-06-16',J2:'2026-06-17',J3:'2026-06-22',J4:'2026-06-23',J5:'2026-06-27',J6:'2026-06-27',
          K1:'2026-06-17',K2:'2026-06-17',K3:'2026-06-23',K4:'2026-06-23',K5:'2026-06-27',K6:'2026-06-27',
          L1:'2026-06-17',L2:'2026-06-17',L3:'2026-06-23',L4:'2026-06-23',L5:'2026-06-27',L6:'2026-06-27',
        }[id];
        if (gameDate === today) {
          if (ANTES_C1.has(id) && (pid==='antonio_carlos'||pid==='teresinha')) return;
          if (g && g[id]) d += calcPoints(g[id], results[id]);
        }
      });
      delta[pid] = d;
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=60',
      },
      body: JSON.stringify({ results, delta, today, timestamp: new Date().toISOString() })
    };

  } catch(e) {
    console.error('Erro:', e.message);
    return { statusCode:500, body: JSON.stringify({error: e.message}) };
  }
};
