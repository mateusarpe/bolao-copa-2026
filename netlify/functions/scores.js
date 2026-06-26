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

// Palpites completos de todos os participantes
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

function calcPoints(guess, result) {
  if (!guess || !result) return 0;
  if (guess.h === result.h && guess.a === result.a) return 3;
  const gw = guess.h > guess.a ? 'H' : guess.h < guess.a ? 'A' : 'D';
  const rw = result.h > result.a ? 'H' : result.h < result.a ? 'A' : 'D';
  return gw === rw ? 1 : 0;
}

function calcTotal(pid, results) {
  const g = GUESSES[pid];
  if (!g) return 0;
  return Object.keys(results).reduce((sum, id) => {
    if (ANTES_C1.has(id) && (pid === 'antonio_carlos' || pid === 'teresinha')) return sum;
    return sum + calcPoints(g[id], results[id]);
  }, 0);
}

function getBRTDateStr(offsetDays) {
  const now = new Date();
  const brt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  if (brt.getHours() < 12) brt.setDate(brt.getDate() - 1);
  if (offsetDays) brt.setDate(brt.getDate() + offsetDays);
  return `${brt.getFullYear()}-${String(brt.getMonth()+1).padStart(2,'0')}-${String(brt.getDate()).padStart(2,'0')}`;
}

function gameFinished(gameId) {
  const start = GAME_SCHEDULE[gameId];
  if (!start) return false;
  const startTime = new Date(start + ':00-03:00');
  return new Date() > new Date(startTime.getTime() + 120 * 60 * 1000);
}

function callAnthropic(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1000,
      system: 'Você conhece os resultados da Copa do Mundo 2026 em tempo real. Retorne APENAS JSON com placares finais. Formato: {"I5":{"h":1,"a":4},"I6":{"h":5,"a":0}}. Sem markdown, sem texto extra.',
      messages: [{ role: 'user', content: prompt }]
    });
    const req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

exports.handler = async function(event, context) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key não configurada' }) };
  }

  // Jogos encerrados nas últimas 48h
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const toSearch = Object.keys(GAME_SCHEDULE).filter(id => {
    if (!gameFinished(id)) return false;
    return new Date(GAME_SCHEDULE[id] + ':00-03:00') > cutoff;
  });

  let results = {};

  if (toSearch.length > 0) {
    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const lista = toSearch.map(id => `${id}: ${GAME_NAMES[id]}`).join('\n');
    const prompt = `Data/hora em Brasília: ${now}\n\nRetorne os placares FINAIS destes jogos da Copa 2026 já encerrados:\n${lista}\n\nRetorne APENAS o JSON.`;

    try {
      const resp = await callAnthropic(prompt);
      const text = resp.content && resp.content[0] && resp.content[0].text || '{}';
      results = JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch(e) {
      console.error('Erro API:', e.message);
    }
  }

  // Calcular pontos totais de todos com os resultados obtidos
  const participants = Object.keys(GUESSES);
  const totals = {};
  participants.forEach(pid => { totals[pid] = calcTotal(pid, results); });

  // Calcular delta do dia — jogos que terminaram HOJE (horário Brasília após 3h)
  const todayStr = getBRTDateStr(0);
  const todayFinished = Object.keys(GAME_SCHEDULE).filter(id => {
    if (!gameFinished(id)) return false;
    const startDate = GAME_SCHEDULE[id].split('T')[0];
    // Verificar se é jogo de hoje (considerando virador 3h)
    const brtNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const hour = brtNow.getHours();
    const todayDateStr = hour < 12
      ? new Date(brtNow.getTime() - 86400000).toISOString().slice(0,10)
      : brtNow.toISOString().slice(0,10);
    return startDate === todayDateStr;
  });

  // Delta = pontos ganhos nos jogos de hoje
  const delta = {};
  participants.forEach(pid => {
    const g = GUESSES[pid];
    let d = 0;
    todayFinished.forEach(id => {
      if (ANTES_C1.has(id) && (pid === 'antonio_carlos' || pid === 'teresinha')) return;
      if (results[id] && g && g[id]) d += calcPoints(g[id], results[id]);
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
    body: JSON.stringify({
      results,
      totals,
      delta,
      todayGames: todayFinished,
      timestamp: new Date().toISOString()
    })
  };
};
