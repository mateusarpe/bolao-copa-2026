import { useState, useEffect, useCallback } from "react";

const PARTICIPANTS_DATA = [
  { id: "mateus",         name: "Mateus",         isAdmin: true  },
  { id: "tiago",          name: "Tiago",          isAdmin: false },
  { id: "teresinha",      name: "Teresinha",      isAdmin: false },
  { id: "antonio_carlos", name: "Antonio Carlos", isAdmin: false },
  { id: "jonas",          name: "Jonas",          isAdmin: false },
  { id: "cecilia",        name: "Cecília",        isAdmin: false },
  { id: "cacia",          name: "Cacia",          isAdmin: false },
  { id: "alicia",         name: "Alicia",         isAdmin: false },
  { id: "lucas",          name: "Lucas",          isAdmin: false },
  { id: "alex",           name: "Alex Araújo",    isAdmin: false },
];

const GROUP_GAMES = [
  {id:"A1",g:"A",home:"México",away:"África do Sul",hc:"MEX",ac:"RSA",date:"11/06 16h"},
  {id:"A2",g:"A",home:"Coreia do Sul",away:"Rep. Tcheca",hc:"KOR",ac:"CZE",date:"11/06 23h"},
  {id:"A3",g:"A",home:"Rep. Tcheca",away:"África do Sul",hc:"CZE",ac:"RSA",date:"18/06 13h"},
  {id:"A4",g:"A",home:"México",away:"Coreia do Sul",hc:"MEX",ac:"KOR",date:"18/06 22h"},
  {id:"A5",g:"A",home:"Rep. Tcheca",away:"México",hc:"CZE",ac:"MEX",date:"24/06 22h"},
  {id:"A6",g:"A",home:"África do Sul",away:"Coreia do Sul",hc:"RSA",ac:"KOR",date:"24/06 22h"},
  {id:"B1",g:"B",home:"Canadá",away:"Bósnia",hc:"CAN",ac:"BIH",date:"12/06 16h"},
  {id:"B2",g:"B",home:"Catar",away:"Suíça",hc:"QAT",ac:"SUI",date:"13/06 16h"},
  {id:"B3",g:"B",home:"Suíça",away:"Bósnia",hc:"SUI",ac:"BIH",date:"18/06 16h"},
  {id:"B4",g:"B",home:"Canadá",away:"Catar",hc:"CAN",ac:"QAT",date:"18/06 19h"},
  {id:"B5",g:"B",home:"Suíça",away:"Canadá",hc:"SUI",ac:"CAN",date:"24/06 16h"},
  {id:"B6",g:"B",home:"Bósnia",away:"Catar",hc:"BIH",ac:"QAT",date:"24/06 16h"},
  {id:"C1",g:"C",home:"Brasil",away:"Marrocos",hc:"BRA",ac:"MAR",date:"13/06 19h"},
  {id:"C2",g:"C",home:"Haiti",away:"Escócia",hc:"HTI",ac:"SCO",date:"13/06 22h"},
  {id:"C3",g:"C",home:"Escócia",away:"Marrocos",hc:"SCO",ac:"MAR",date:"19/06 19h"},
  {id:"C4",g:"C",home:"Brasil",away:"Haiti",hc:"BRA",ac:"HTI",date:"19/06 21h30"},
  {id:"C5",g:"C",home:"Escócia",away:"Brasil",hc:"SCO",ac:"BRA",date:"24/06 19h"},
  {id:"C6",g:"C",home:"Marrocos",away:"Haiti",hc:"MAR",ac:"HTI",date:"24/06 19h"},
  {id:"D1",g:"D",home:"EUA",away:"Paraguai",hc:"USA",ac:"PAR",date:"12/06 22h"},
  {id:"D2",g:"D",home:"Austrália",away:"Turquia",hc:"AUS",ac:"TUR",date:"14/06 01h"},
  {id:"D3",g:"D",home:"Turquia",away:"Paraguai",hc:"TUR",ac:"PAR",date:"20/06 00h"},
  {id:"D4",g:"D",home:"EUA",away:"Austrália",hc:"USA",ac:"AUS",date:"19/06 16h"},
  {id:"D5",g:"D",home:"Turquia",away:"EUA",hc:"TUR",ac:"USA",date:"25/06 23h"},
  {id:"D6",g:"D",home:"Paraguai",away:"Austrália",hc:"PAR",ac:"AUS",date:"25/06 23h"},
  {id:"E1",g:"E",home:"Alemanha",away:"Curaçao",hc:"GER",ac:"CUW",date:"14/06 14h"},
  {id:"E2",g:"E",home:"Costa do Marfim",away:"Equador",hc:"CIV",ac:"ECU",date:"14/06 20h"},
  {id:"E3",g:"E",home:"Alemanha",away:"Costa do Marfim",hc:"GER",ac:"CIV",date:"20/06 17h"},
  {id:"E4",g:"E",home:"Equador",away:"Curaçao",hc:"ECU",ac:"CUW",date:"20/06 21h"},
  {id:"E5",g:"E",home:"Equador",away:"Alemanha",hc:"ECU",ac:"GER",date:"25/06 17h"},
  {id:"E6",g:"E",home:"Curaçao",away:"Costa do Marfim",hc:"CUW",ac:"CIV",date:"25/06 17h"},
  {id:"F1",g:"F",home:"Holanda",away:"Japão",hc:"NED",ac:"JPN",date:"14/06 17h"},
  {id:"F2",g:"F",home:"Suécia",away:"Tunísia",hc:"SWE",ac:"TUN",date:"14/06 23h"},
  {id:"F3",g:"F",home:"Tunísia",away:"Japão",hc:"TUN",ac:"JPN",date:"20/06 23h"},
  {id:"F4",g:"F",home:"Holanda",away:"Suécia",hc:"NED",ac:"SWE",date:"20/06 14h"},
  {id:"F5",g:"F",home:"Tunísia",away:"Holanda",hc:"TUN",ac:"NED",date:"25/06 20h"},
  {id:"F6",g:"F",home:"Japão",away:"Suécia",hc:"JPN",ac:"SWE",date:"25/06 20h"},
  {id:"G1",g:"G",home:"Bélgica",away:"Egito",hc:"BEL",ac:"EGY",date:"15/06 16h"},
  {id:"G2",g:"G",home:"Irã",away:"Nova Zelândia",hc:"IRN",ac:"NZL",date:"15/06 22h"},
  {id:"G3",g:"G",home:"Bélgica",away:"Irã",hc:"BEL",ac:"IRN",date:"21/06 16h"},
  {id:"G4",g:"G",home:"Nova Zelândia",away:"Egito",hc:"NZL",ac:"EGY",date:"21/06 22h"},
  {id:"G5",g:"G",home:"Nova Zelândia",away:"Bélgica",hc:"NZL",ac:"BEL",date:"27/06 00h"},
  {id:"G6",g:"G",home:"Egito",away:"Irã",hc:"EGY",ac:"IRN",date:"27/06 00h"},
  {id:"H1",g:"H",home:"Espanha",away:"Cabo Verde",hc:"ESP",ac:"CPV",date:"15/06 13h"},
  {id:"H2",g:"H",home:"Arábia Saudita",away:"Uruguai",hc:"KSA",ac:"URU",date:"15/06 19h"},
  {id:"H3",g:"H",home:"Espanha",away:"Arábia Saudita",hc:"ESP",ac:"KSA",date:"21/06 13h"},
  {id:"H4",g:"H",home:"Uruguai",away:"Cabo Verde",hc:"URU",ac:"CPV",date:"21/06 19h"},
  {id:"H5",g:"H",home:"Uruguai",away:"Espanha",hc:"URU",ac:"ESP",date:"26/06 21h"},
  {id:"H6",g:"H",home:"Cabo Verde",away:"Arábia Saudita",hc:"CPV",ac:"KSA",date:"26/06 21h"},
  {id:"I1",g:"I",home:"França",away:"Senegal",hc:"FRA",ac:"SEN",date:"16/06 16h"},
  {id:"I2",g:"I",home:"Iraque",away:"Noruega",hc:"IRQ",ac:"NOR",date:"16/06 19h"},
  {id:"I3",g:"I",home:"França",away:"Iraque",hc:"FRA",ac:"IRQ",date:"22/06 18h"},
  {id:"I4",g:"I",home:"Noruega",away:"Senegal",hc:"NOR",ac:"SEN",date:"22/06 21h"},
  {id:"I5",g:"I",home:"Noruega",away:"França",hc:"NOR",ac:"FRA",date:"26/06 16h"},
  {id:"I6",g:"I",home:"Senegal",away:"Iraque",hc:"SEN",ac:"IRQ",date:"26/06 16h"},
  {id:"J1",g:"J",home:"Argentina",away:"Argélia",hc:"ARG",ac:"ALG",date:"16/06 22h"},
  {id:"J2",g:"J",home:"Áustria",away:"Jordânia",hc:"AUT",ac:"JOR",date:"17/06 01h"},
  {id:"J3",g:"J",home:"Argentina",away:"Áustria",hc:"ARG",ac:"AUT",date:"22/06 14h"},
  {id:"J4",g:"J",home:"Jordânia",away:"Argélia",hc:"JOR",ac:"ALG",date:"23/06 00h"},
  {id:"J5",g:"J",home:"Jordânia",away:"Argentina",hc:"JOR",ac:"ARG",date:"27/06 20h30"},
  {id:"J6",g:"J",home:"Argélia",away:"Áustria",hc:"ALG",ac:"AUT",date:"27/06 23h"},
  {id:"K1",g:"K",home:"Portugal",away:"RD Congo",hc:"POR",ac:"COD",date:"17/06 14h"},
  {id:"K2",g:"K",home:"Uzbequistão",away:"Colômbia",hc:"UZB",ac:"COL",date:"17/06 21h"},
  {id:"K3",g:"K",home:"Portugal",away:"Uzbequistão",hc:"POR",ac:"UZB",date:"23/06 14h"},
  {id:"K4",g:"K",home:"Colômbia",away:"RD Congo",hc:"COL",ac:"COD",date:"23/06 23h"},
  {id:"K5",g:"K",home:"Colômbia",away:"Portugal",hc:"COL",ac:"POR",date:"27/06 20h30"},
  {id:"K6",g:"K",home:"RD Congo",away:"Uzbequistão",hc:"COD",ac:"UZB",date:"27/06 20h30"},
  {id:"L1",g:"L",home:"Inglaterra",away:"Croácia",hc:"ENG",ac:"CRO",date:"17/06 17h"},
  {id:"L2",g:"L",home:"Gana",away:"Panamá",hc:"GHA",ac:"PAN",date:"17/06 20h"},
  {id:"L3",g:"L",home:"Inglaterra",away:"Gana",hc:"ENG",ac:"GHA",date:"23/06 17h"},
  {id:"L4",g:"L",home:"Panamá",away:"Croácia",hc:"PAN",ac:"CRO",date:"23/06 20h"},
  {id:"L5",g:"L",home:"Panamá",away:"Inglaterra",hc:"PAN",ac:"ENG",date:"27/06 18h"},
  {id:"L6",g:"L",home:"Croácia",away:"Gana",hc:"CRO",ac:"GHA",date:"27/06 18h"},
];

const KNOWN_RESULTS = {
  // GRUPO A
  A1:{h:2,a:0},A2:{h:2,a:1},A3:{h:1,a:1},A4:{h:1,a:0},A5:{h:0,a:3},A6:{h:1,a:0},
  // GRUPO B
  B1:{h:1,a:1},B2:{h:1,a:1},B3:{h:4,a:1},B4:{h:6,a:0},B5:{h:2,a:1},B6:{h:3,a:1},
  // GRUPO C
  C1:{h:1,a:1},C2:{h:0,a:1},C3:{h:0,a:1},C4:{h:3,a:0},C5:{h:0,a:3},C6:{h:4,a:2},
  // GRUPO D
  D1:{h:4,a:1},D2:{h:2,a:0},D3:{h:0,a:1},D4:{h:2,a:0},D5:{h:3,a:2},D6:{h:0,a:0},
  // GRUPO E
  E1:{h:7,a:1},E2:{h:1,a:0},E3:{h:2,a:1},E4:{h:0,a:0},E5:{h:2,a:1},E6:{h:0,a:2},
  // GRUPO F
  F1:{h:2,a:2},F2:{h:5,a:1},F3:{h:0,a:4},F4:{h:5,a:1},F5:{h:1,a:3},F6:{h:1,a:1},
  // GRUPO G
  G1:{h:1,a:1},G2:{h:2,a:2},G3:{h:0,a:0},G4:{h:1,a:3},
  // GRUPO H
  H1:{h:0,a:0},H2:{h:1,a:1},H3:{h:4,a:0},H4:{h:2,a:2},
  // GRUPO I — todos completos
  I1:{h:3,a:1},I2:{h:1,a:4},I3:{h:3,a:0},I4:{h:3,a:2},
  I5:{h:1,a:4}, // Noruega 1x4 França
  I6:{h:5,a:0}, // Senegal 5x0 Iraque
  // GRUPO J
  J1:{h:3,a:0},J2:{h:3,a:1},J3:{h:2,a:0},J4:{h:1,a:2},
  // GRUPO K
  K1:{h:1,a:1},K2:{h:1,a:3},K3:{h:5,a:0},K4:{h:1,a:0},
  // GRUPO L
  L1:{h:4,a:2},L2:{h:1,a:0},L3:{h:0,a:0},L4:{h:0,a:1},
};

const GROUP_GUESSES = {
  alex: {
    A1: {h:2,a:0},
    A2: {h:1,a:0},
    A3: {h:0,a:2},
    A4: {h:2,a:2},
    A5: {h:0,a:3},
    A6: {h:1,a:1},
    B1: {h:1,a:1},
    B2: {h:0,a:3},
    B3: {h:2,a:0},
    B4: {h:1,a:0},
    B5: {h:1,a:1},
    B6: {h:1,a:0},
    C1: {h:2,a:0},
    C2: {h:0,a:1},
    C3: {h:0,a:2},
    C4: {h:3,a:0},
    C5: {h:0,a:2},
    C6: {h:2,a:0},
    D1: {h:0,a:1},
    D2: {h:0,a:2},
    D3: {h:1,a:1},
    D4: {h:1,a:0},
    D5: {h:0,a:1},
    D6: {h:2,a:0},
    E1: {h:3,a:0},
    E2: {h:2,a:0},
    E3: {h:1,a:1},
    E4: {h:2,a:0},
    E5: {h:0,a:2},
    E6: {h:1,a:2},
    F1: {h:2,a:2},
    F2: {h:2,a:0},
    F3: {h:0,a:3},
    F4: {h:2,a:1},
    F5: {h:1,a:2},
    F6: {h:2,a:0},
    G1: {h:2,a:0},
    G2: {h:1,a:1},
    G3: {h:2,a:0},
    G4: {h:0,a:0},
    H1: {h:4,a:0},
    H2: {h:2,a:2},
    H3: {h:2,a:1},
    H4: {h:2,a:0},
    I1: {h:1,a:1},
    I2: {h:0,a:0},
    I3: {h:2,a:0},
    I4: {h:0,a:2},
    J1: {h:3,a:0},
    J2: {h:1,a:1},
    J3: {h:2,a:0},
    J4: {h:0,a:1},
    K1: {h:3,a:0},
    K2: {h:0,a:2},
    K3: {h:2,a:0},
    K4: {h:2,a:0},
    L1: {h:1,a:1},
    L2: {h:1,a:1},
    L3: {h:2,a:0},
    L4: {h:0,a:2},
    G5: {h:0,a:3},
    G6: {h:1,a:0},
    H5: {h:1,a:3},
    H6: {h:0,a:2},
    I5: {h:0,a:3},
    I6: {h:2,a:0},
    J5: {h:0,a:2},
    J6: {h:1,a:1},
    K5: {h:2,a:2},
    K6: {h:0,a:0},
    L5: {h:0,a:3},
    L6: {h:2,a:1},
  },
  alicia: {
    A1: {h:2,a:0},
    A2: {h:1,a:1},
    A3: {h:2,a:0},
    A4: {h:1,a:1},
    A5: {h:1,a:2},
    A6: {h:0,a:2},
    B1: {h:1,a:1},
    B2: {h:0,a:1},
    B3: {h:2,a:0},
    B4: {h:2,a:0},
    B5: {h:1,a:1},
    B6: {h:2,a:0},
    C1: {h:2,a:1},
    C2: {h:0,a:3},
    C3: {h:1,a:1},
    C4: {h:4,a:0},
    C5: {h:1,a:2},
    C6: {h:2,a:0},
    D1: {h:2,a:1},
    D2: {h:1,a:2},
    D3: {h:2,a:1},
    D4: {h:3,a:1},
    D5: {h:1,a:1},
    D6: {h:2,a:0},
    E1: {h:3,a:0},
    E2: {h:1,a:1},
    E3: {h:2,a:0},
    E4: {h:2,a:0},
    E5: {h:1,a:2},
    E6: {h:0,a:2},
    F1: {h:2,a:0},
    F2: {h:1,a:0},
    F3: {h:1,a:2},
    F4: {h:2,a:2},
    F5: {h:1,a:3},
    F6: {h:1,a:1},
    G1: {h:2,a:1},
    G2: {h:2,a:0},
    G3: {h:1,a:1},
    G4: {h:0,a:3},
    H1: {h:3,a:0},
    H2: {h:0,a:2},
    H3: {h:4,a:1},
    H4: {h:2,a:0},
    I1: {h:3,a:1},
    I2: {h:0,a:2},
    I3: {h:3,a:0},
    I4: {h:1,a:1},
    J1: {h:3,a:1},
    J2: {h:2,a:0},
    J3: {h:2,a:1},
    J4: {h:0,a:2},
    K1: {h:3,a:0},
    K2: {h:0,a:2},
    K3: {h:2,a:0},
    K4: {h:2,a:1},
    L1: {h:2,a:1},
    L2: {h:1,a:1},
    L3: {h:2,a:0},
    L4: {h:1,a:1},
    G5: {h:0,a:2},
    G6: {h:1,a:1},
    H5: {h:1,a:2},
    H6: {h:1,a:1},
    I5: {h:1,a:2},
    I6: {h:2,a:0},
    J5: {h:0,a:2},
    J6: {h:1,a:1},
    K5: {h:2,a:3},
    K6: {h:1,a:1},
    L5: {h:0,a:3},
    L6: {h:2,a:0},
  },
  cacia: {
    A1: {h:1,a:1},
    A2: {h:2,a:2},
    A3: {h:2,a:1},
    A4: {h:2,a:3},
    A5: {h:2,a:2},
    A6: {h:1,a:2},
    B1: {h:2,a:1},
    B2: {h:1,a:1},
    B3: {h:2,a:1},
    B4: {h:4,a:1},
    B5: {h:3,a:3},
    B6: {h:1,a:1},
    C1: {h:2,a:1},
    C2: {h:1,a:2},
    C3: {h:2,a:3},
    C4: {h:3,a:0},
    C5: {h:2,a:3},
    C6: {h:3,a:1},
    D1: {h:2,a:2},
    D2: {h:1,a:1},
    D3: {h:1,a:2},
    D4: {h:2,a:2},
    D5: {h:1,a:3},
    D6: {h:3,a:2},
    E1: {h:3,a:1},
    E2: {h:1,a:2},
    E3: {h:2,a:0},
    E4: {h:2,a:0},
    E5: {h:1,a:2},
    E6: {h:0,a:0},
    F1: {h:2,a:1},
    F2: {h:3,a:1},
    F3: {h:1,a:2},
    F4: {h:2,a:2},
    F5: {h:1,a:4},
    F6: {h:2,a:3},
    G1: {h:3,a:3},
    G2: {h:1,a:1},
    G3: {h:0,a:0},
    G4: {h:1,a:1},
    H1: {h:4,a:0},
    H2: {h:1,a:3},
    H3: {h:2,a:0},
    H4: {h:2,a:0},
    I1: {h:2,a:1},
    I2: {h:1,a:2},
    I3: {h:3,a:1},
    I4: {h:2,a:2},
    J1: {h:2,a:0},
    J2: {h:1,a:1},
    J3: {h:3,a:1},
    J4: {h:0,a:0},
    K1: {h:2,a:1},
    K2: {h:0,a:2},
    K3: {h:2,a:0},
    K4: {h:2,a:1},
    L1: {h:4,a:3},
    L2: {h:2,a:1},
    L3: {h:3,a:0},
    L4: {h:1,a:3},
    G5: {h:0,a:3},
    G6: {h:2,a:1},
    H5: {h:3,a:3},
    H6: {h:1,a:1},
    I5: {h:1,a:3},
    I6: {h:1,a:1},
    J5: {h:1,a:2},
    J6: {h:0,a:1},
    K5: {h:2,a:2},
    K6: {h:1,a:1},
    L5: {h:0,a:2},
    L6: {h:3,a:1},
  },
  cecilia: {
    A1: {h:3,a:0},
    A2: {h:1,a:1},
    A3: {h:2,a:0},
    A4: {h:2,a:1},
    A5: {h:0,a:4},
    A6: {h:0,a:3},
    B1: {h:3,a:0},
    B2: {h:0,a:3},
    B3: {h:4,a:0},
    B4: {h:2,a:0},
    B5: {h:0,a:0},
    B6: {h:1,a:2},
    C1: {h:2,a:1},
    C2: {h:0,a:2},
    C3: {h:0,a:3},
    C4: {h:4,a:0},
    C5: {h:1,a:3},
    C6: {h:4,a:0},
    D1: {h:3,a:2},
    D2: {h:1,a:1},
    D3: {h:0,a:1},
    D4: {h:3,a:0},
    D5: {h:0,a:4},
    D6: {h:3,a:0},
    E1: {h:5,a:0},
    E2: {h:1,a:2},
    E3: {h:2,a:1},
    E4: {h:3,a:0},
    E5: {h:2,a:3},
    E6: {h:0,a:2},
    F1: {h:3,a:1},
    F2: {h:2,a:0},
    F3: {h:1,a:2},
    F4: {h:2,a:2},
    F5: {h:0,a:4},
    F6: {h:1,a:0},
    G1: {h:4,a:0},
    G2: {h:1,a:1},
    G3: {h:2,a:0},
    G4: {h:0,a:0},
    H1: {h:6,a:0},
    H2: {h:0,a:3},
    H3: {h:4,a:0},
    H4: {h:2,a:0},
    I1: {h:5,a:0},
    I2: {h:0,a:3},
    I3: {h:3,a:0},
    I4: {h:2,a:0},
    J1: {h:2,a:1},
    J2: {h:0,a:0},
    J3: {h:1,a:0},
    J4: {h:1,a:3},
    K1: {h:4,a:0},
    K2: {h:0,a:2},
    K3: {h:3,a:1},
    K4: {h:2,a:0},
    L1: {h:0,a:0},
    L2: {h:1,a:0},
    L3: {h:2,a:1},
    L4: {h:0,a:3},
    G5: {h:0,a:3},
    G6: {h:0,a:1},
    H5: {h:2,a:2},
    H6: {h:1,a:1},
    I5: {h:1,a:2},
    I6: {h:2,a:0},
    J5: {h:0,a:3},
    J6: {h:0,a:2},
    K5: {h:1,a:2},
    K6: {h:0,a:0},
    L5: {h:0,a:2},
    L6: {h:1,a:1},
  },
  jonas: {
    A1: {h:3,a:0},
    A2: {h:1,a:2},
    A3: {h:2,a:1},
    A4: {h:0,a:0},
    A5: {h:1,a:1},
    A6: {h:1,a:1},
    B1: {h:2,a:0},
    B2: {h:1,a:3},
    B3: {h:3,a:0},
    B4: {h:2,a:1},
    B5: {h:2,a:2},
    B6: {h:1,a:2},
    C1: {h:2,a:0},
    C2: {h:1,a:1},
    C3: {h:1,a:2},
    C4: {h:3,a:0},
    C5: {h:1,a:2},
    C6: {h:2,a:1},
    D1: {h:2,a:2},
    D2: {h:2,a:2},
    D3: {h:1,a:3},
    D4: {h:2,a:1},
    D5: {h:1,a:2},
    D6: {h:3,a:0},
    E1: {h:4,a:0},
    E2: {h:1,a:1},
    E3: {h:4,a:1},
    E4: {h:2,a:2},
    E5: {h:0,a:3},
    E6: {h:1,a:1},
    F1: {h:2,a:1},
    F2: {h:1,a:0},
    F3: {h:0,a:2},
    F4: {h:1,a:2},
    F5: {h:1,a:3},
    F6: {h:3,a:2},
    G1: {h:3,a:1},
    G2: {h:0,a:0},
    G3: {h:2,a:0},
    G4: {h:0,a:1},
    H1: {h:3,a:0},
    H2: {h:0,a:3},
    H3: {h:2,a:0},
    H4: {h:2,a:0},
    I1: {h:2,a:0},
    I2: {h:1,a:1},
    I3: {h:2,a:0},
    I4: {h:1,a:1},
    J1: {h:3,a:0},
    J2: {h:1,a:1},
    J3: {h:3,a:0},
    J4: {h:1,a:1},
    K1: {h:3,a:1},
    K2: {h:0,a:2},
    K3: {h:3,a:0},
    K4: {h:2,a:2},
    L1: {h:2,a:2},
    L2: {h:2,a:2},
    L3: {h:3,a:1},
    L4: {h:1,a:1},
    G5: {h:0,a:3},
    G6: {h:1,a:1},
    H5: {h:2,a:2},
    H6: {h:2,a:1},
    I5: {h:0,a:2},
    I6: {h:1,a:1},
    J5: {h:0,a:2},
    J6: {h:1,a:1},
    K5: {h:1,a:3},
    K6: {h:1,a:1},
    L5: {h:1,a:4},
    L6: {h:2,a:1},
  },
  lucas: {
    A1: {h:3,a:1},
    A2: {h:1,a:1},
    A3: {h:2,a:2},
    A4: {h:1,a:1},
    A5: {h:3,a:2},
    A6: {h:2,a:1},
    B1: {h:3,a:2},
    B2: {h:2,a:3},
    B3: {h:2,a:2},
    B4: {h:2,a:2},
    B5: {h:2,a:1},
    B6: {h:3,a:2},
    C1: {h:4,a:1},
    C2: {h:2,a:1},
    C3: {h:2,a:2},
    C4: {h:3,a:0},
    C5: {h:1,a:2},
    C6: {h:3,a:1},
    D1: {h:4,a:2},
    D2: {h:3,a:2},
    D3: {h:2,a:2},
    D4: {h:3,a:2},
    D5: {h:1,a:3},
    D6: {h:0,a:3},
    E1: {h:3,a:0},
    E2: {h:0,a:2},
    E3: {h:2,a:1},
    E4: {h:2,a:1},
    E5: {h:2,a:2},
    E6: {h:1,a:2},
    F1: {h:2,a:1},
    F2: {h:3,a:2},
    F3: {h:1,a:1},
    F4: {h:2,a:2},
    F5: {h:2,a:1},
    F6: {h:1,a:2},
    G1: {h:3,a:1},
    G2: {h:1,a:2},
    G3: {h:2,a:0},
    G4: {h:2,a:1},
    H1: {h:3,a:0},
    H2: {h:0,a:1},
    H3: {h:2,a:0},
    H4: {h:2,a:1},
    I1: {h:2,a:1},
    I2: {h:2,a:3},
    I3: {h:2,a:0},
    I4: {h:3,a:1},
    J1: {h:3,a:1},
    J2: {h:2,a:1},
    J3: {h:2,a:0},
    J4: {h:2,a:2},
    K1: {h:3,a:1},
    K2: {h:1,a:2},
    K3: {h:2,a:0},
    K4: {h:3,a:1},
    L1: {h:2,a:1},
    L2: {h:0,a:2},
    L3: {h:2,a:2},
    L4: {h:3,a:2},
    G5: {h:2,a:3},
    G6: {h:2,a:1},
    H5: {h:1,a:2},
    H6: {h:2,a:2},
    I5: {h:2,a:2},
    I6: {h:1,a:1},
    J5: {h:1,a:2},
    J6: {h:1,a:0},
    K5: {h:1,a:2},
    K6: {h:2,a:1},
    L5: {h:2,a:1},
    L6: {h:2,a:2},
  },
  mateus: {
    A1: {h:2,a:1},
    A2: {h:1,a:0},
    A3: {h:1,a:1},
    A4: {h:2,a:0},
    A5: {h:0,a:2},
    A6: {h:2,a:1},
    B1: {h:1,a:0},
    B2: {h:0,a:2},
    B3: {h:1,a:0},
    B4: {h:1,a:0},
    B5: {h:2,a:1},
    B6: {h:0,a:0},
    C1: {h:2,a:1},
    C2: {h:0,a:1},
    C3: {h:0,a:3},
    C4: {h:3,a:0},
    C5: {h:0,a:4},
    C6: {h:3,a:0},
    D1: {h:1,a:2},
    D2: {h:2,a:0},
    D3: {h:0,a:3},
    D4: {h:1,a:1},
    D5: {h:2,a:2},
    D6: {h:3,a:2},
    E1: {h:3,a:0},
    E2: {h:0,a:2},
    E3: {h:2,a:0},
    E4: {h:3,a:2},
    E5: {h:1,a:3},
    E6: {h:0,a:0},
    F1: {h:2,a:2},
    F2: {h:1,a:2},
    F3: {h:0,a:3},
    F4: {h:3,a:0},
    F5: {h:0,a:2},
    F6: {h:3,a:0},
    G1: {h:3,a:0},
    G2: {h:1,a:1},
    G3: {h:2,a:1},
    G4: {h:1,a:1},
    H1: {h:4,a:0},
    H2: {h:0,a:2},
    H3: {h:2,a:0},
    H4: {h:3,a:0},
    I1: {h:3,a:0},
    I2: {h:0,a:0},
    I3: {h:3,a:1},
    I4: {h:2,a:2},
    J1: {h:3,a:0},
    J2: {h:1,a:1},
    J3: {h:2,a:1},
    J4: {h:0,a:0},
    K1: {h:2,a:0},
    K2: {h:1,a:2},
    K3: {h:3,a:0},
    K4: {h:2,a:2},
    L1: {h:2,a:1},
    L2: {h:1,a:1},
    L3: {h:3,a:0},
    L4: {h:0,a:3},
    G5: {h:0,a:2},
    G6: {h:0,a:0},
    H5: {h:2,a:2},
    H6: {h:0,a:0},
    I5: {h:2,a:3},
    I6: {h:0,a:0},
    J5: {h:1,a:3},
    J6: {h:1,a:1},
    K5: {h:2,a:3},
    K6: {h:1,a:1},
    L5: {h:0,a:2},
    L6: {h:2,a:1},
  },
  tiago: {
    A1: {h:1,a:1},
    A2: {h:2,a:0},
    A3: {h:1,a:1},
    A4: {h:3,a:1},
    A5: {h:0,a:2},
    A6: {h:1,a:0},
    B1: {h:2,a:0},
    B2: {h:0,a:2},
    B3: {h:1,a:0},
    B4: {h:3,a:1},
    B5: {h:2,a:2},
    B6: {h:1,a:1},
    C1: {h:1,a:1},
    C2: {h:0,a:1},
    C3: {h:1,a:2},
    C4: {h:4,a:0},
    C5: {h:0,a:2},
    C6: {h:3,a:1},
    D1: {h:1,a:2},
    D2: {h:0,a:4},
    D3: {h:1,a:1},
    D4: {h:3,a:0},
    D5: {h:1,a:1},
    D6: {h:3,a:0},
    E1: {h:6,a:0},
    E2: {h:1,a:2},
    E3: {h:2,a:0},
    E4: {h:3,a:0},
    E5: {h:1,a:0},
    E6: {h:0,a:1},
    F1: {h:2,a:2},
    F2: {h:1,a:1},
    F3: {h:0,a:1},
    F4: {h:2,a:0},
    F5: {h:0,a:3},
    F6: {h:2,a:1},
    G1: {h:2,a:1},
    G2: {h:1,a:1},
    G3: {h:3,a:0},
    G4: {h:1,a:1},
    H1: {h:3,a:0},
    H2: {h:0,a:1},
    H3: {h:2,a:0},
    H4: {h:3,a:1},
    I1: {h:3,a:1},
    I2: {h:0,a:3},
    I3: {h:4,a:0},
    I4: {h:3,a:2},
    J1: {h:2,a:0},
    J2: {h:1,a:1},
    J3: {h:3,a:0},
    J4: {h:1,a:1},
    K1: {h:3,a:0},
    K2: {h:0,a:2},
    K3: {h:2,a:0},
    K4: {h:1,a:0},
    L1: {h:0,a:0},
    L2: {h:1,a:1},
    L3: {h:1,a:0},
    L4: {h:1,a:2},
    G5: {h:0,a:2},
    G6: {h:2,a:2},
    H5: {h:2,a:2},
    H6: {h:0,a:0},
    I5: {h:0,a:2},
    I6: {h:1,a:0},
    J5: {h:0,a:2},
    J6: {h:1,a:1},
    K5: {h:0,a:0},
    K6: {h:1,a:1},
    L5: {h:0,a:3},
    L6: {h:1,a:0},
  },
  antonio_carlos: {
    A3: {h:1,a:1},
    A4: {h:1,a:1},
    A5: {h:1,a:1},
    A6: {h:1,a:1},
    B3: {h:0,a:0},
    B4: {h:0,a:0},
    B5: {h:0,a:0},
    B6: {h:0,a:0},
    C1: {h:2,a:1},
    C2: {h:1,a:2},
    C3: {h:1,a:1},
    C4: {h:1,a:1},
    C5: {h:0,a:0},
    C6: {h:1,a:1},
    D2: {h:1,a:0},
    D3: {h:1,a:1},
    D4: {h:1,a:1},
    D5: {h:1,a:1},
    D6: {h:1,a:1},
    E1: {h:0,a:0},
    E2: {h:0,a:0},
    E3: {h:0,a:0},
    E4: {h:0,a:0},
    E5: {h:0,a:0},
    E6: {h:0,a:0},
    F1: {h:1,a:1},
    F2: {h:1,a:1},
    F3: {h:1,a:1},
    F4: {h:1,a:1},
    F5: {h:1,a:1},
    F6: {h:1,a:1},
    G1: {h:0,a:0},
    G2: {h:0,a:0},
    G3: {h:0,a:0},
    G4: {h:0,a:0},
    H1: {h:1,a:1},
    H2: {h:1,a:1},
    H3: {h:1,a:1},
    H4: {h:1,a:1},
    I1: {h:0,a:0},
    I2: {h:0,a:0},
    I3: {h:1,a:1},
    I4: {h:1,a:1},
    J1: {h:0,a:0},
    J2: {h:0,a:0},
    J3: {h:1,a:1},
    J4: {h:1,a:1},
    K1: {h:1,a:1},
    K2: {h:1,a:1},
    K3: {h:1,a:1},
    K4: {h:1,a:1},
    L1: {h:1,a:1},
    L2: {h:1,a:1},
    L3: {h:1,a:1},
    L4: {h:1,a:1},
    G5: {h:0,a:0},
    G6: {h:0,a:0},
    H5: {h:1,a:1},
    H6: {h:1,a:1},
    I5: {h:1,a:1},
    I6: {h:0,a:0},
    J5: {h:0,a:0},
    J6: {h:0,a:0},
    K5: {h:0,a:0},
    K6: {h:0,a:0},
    L5: {h:1,a:1},
    L6: {h:1,a:1},
  },
  teresinha: {
    A3: {h:0,a:0},
    A4: {h:2,a:0},
    A5: {h:0,a:1},
    A6: {h:1,a:1},
    B3: {h:0,a:0},
    B4: {h:2,a:1},
    B5: {h:2,a:1},
    B6: {h:0,a:0},
    C1: {h:2,a:1},
    C2: {h:0,a:1},
    C3: {h:1,a:0},
    C4: {h:2,a:1},
    C5: {h:0,a:2},
    C6: {h:0,a:1},
    D2: {h:2,a:1},
    D3: {h:0,a:0},
    D4: {h:2,a:1},
    D5: {h:1,a:2},
    D6: {h:0,a:2},
    E1: {h:2,a:1},
    E2: {h:3,a:0},
    E3: {h:3,a:1},
    E4: {h:0,a:1},
    E5: {h:1,a:3},
    E6: {h:0,a:0},
    F1: {h:2,a:2},
    F2: {h:1,a:0},
    F3: {h:1,a:3},
    F4: {h:0,a:2},
    F5: {h:0,a:2},
    F6: {h:2,a:0},
    G1: {h:1,a:0},
    G2: {h:1,a:0},
    G3: {h:0,a:1},
    G4: {h:2,a:1},
    H1: {h:2,a:1},
    H2: {h:1,a:1},
    H3: {h:2,a:1},
    H4: {h:2,a:1},
    I1: {h:2,a:1},
    I2: {h:1,a:0},
    I3: {h:2,a:1},
    I4: {h:1,a:1},
    J1: {h:2,a:0},
    J2: {h:2,a:1},
    J3: {h:2,a:2},
    J4: {h:1,a:1},
    K1: {h:2,a:0},
    K2: {h:1,a:0},
    K3: {h:2,a:1},
    K4: {h:0,a:1},
    L1: {h:2,a:0},
    L2: {h:1,a:1},
    L3: {h:1,a:2},
    L4: {h:2,a:0},
    G5: {h:2,a:2},
    G6: {h:1,a:0},
    H5: {h:2,a:2},
    H6: {h:1,a:1},
    I5: {h:1,a:2},
    I6: {h:1,a:1},
    J5: {h:1,a:2},
    J6: {h:0,a:1},
    K5: {h:0,a:2},
    K6: {h:0,a:1},
    L5: {h:1,a:2},
    L6: {h:0,a:1},
  },
};


const FLAGS = {
  MEX:"🇲🇽",RSA:"🇿🇦",KOR:"🇰🇷",CZE:"🇨🇿",CAN:"🇨🇦",BIH:"🇧🇦",QAT:"🇶🇦",SUI:"🇨🇭",
  BRA:"🇧🇷",MAR:"🇲🇦",HTI:"🇭🇹",SCO:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",USA:"🇺🇸",PAR:"🇵🇾",AUS:"🇦🇺",TUR:"🇹🇷",
  GER:"🇩🇪",CUW:"🇨🇼",CIV:"🇨🇮",ECU:"🇪🇨",NED:"🇳🇱",JPN:"🇯🇵",SWE:"🇸🇪",TUN:"🇹🇳",
  BEL:"🇧🇪",EGY:"🇪🇬",IRN:"🇮🇷",NZL:"🇳🇿",ESP:"🇪🇸",CPV:"🇨🇻",KSA:"🇸🇦",URU:"🇺🇾",
  FRA:"🇫🇷",SEN:"🇸🇳",IRQ:"🇮🇶",NOR:"🇳🇴",ARG:"🇦🇷",ALG:"🇩🇿",AUT:"🇦🇹",JOR:"🇯🇴",
  POR:"🇵🇹",COD:"🇨🇩",UZB:"🇺🇿",COL:"🇨🇴",ENG:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",CRO:"🇭🇷",GHA:"🇬🇭",PAN:"🇵🇦",
};

const ANTES_C1 = new Set(["A1","A2","B1","D1","B2"]);

function calcPoints(guess, result) {
  if (!result || !guess) return null;
  const {h:gh,a:ga} = guess, {h:rh,a:ra} = result;
  if (gh===rh && ga===ra) return 3;
  const gw = gh>ga?"H":gh<ga?"A":"D", rw = rh>ra?"H":rh<ra?"A":"D";
  return gw===rw ? 1 : 0;
}

function calcTotal(pid, results) {
  const guesses = GROUP_GUESSES[pid]; if (!guesses) return 0;
  return GROUP_GAMES.reduce((sum,g) => {
    const r=results[g.id], gu=guesses[g.id];
    if (r && gu && !(ANTES_C1.has(g.id) && (pid==="antonio_carlos"||pid==="teresinha"))) {
      const p=calcPoints(gu,r); return sum+(p||0);
    }
    return sum;
  },0);
}

function LoginScreen({onLogin}) {
  const [name,setName]=useState(""), [err,setErr]=useState("");
  const handle = () => {
    const t=name.trim(); if(!t){setErr("Digite seu nome");return;}
    const f=PARTICIPANTS_DATA.find(p=>p.name.toLowerCase()===t.toLowerCase()||p.id===t.toLowerCase());
    if(!f){setErr("Nome não encontrado.");return;}
    onLogin(f);
  };
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0e1a,#0f1f3d)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <div style={{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,padding:"48px 40px",maxWidth:400,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:12}}>⚽</div>
        <h1 style={{color:"#fff",fontSize:26,fontWeight:800,margin:"0 0 4px"}}>Bolão Copa 2026</h1>
        <p style={{color:"rgba(255,255,255,0.4)",margin:"0 0 32px",fontSize:13}}>Família Araújo Pereira</p>
        <input value={name} onChange={e=>{setName(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&handle()}
          placeholder="Digite seu nome..."
          style={{width:"100%",padding:"14px 16px",borderRadius:12,border:err?"1px solid #ff4444":"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
        {err&&<p style={{color:"#ff6b6b",fontSize:13,margin:"0 0 8px"}}>{err}</p>}
        <button onClick={handle} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#FFD700,#FFA500)",color:"#0a0e1a",fontSize:16,fontWeight:800,cursor:"pointer",marginBottom:20}}>
          Entrar →
        </button>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
          {PARTICIPANTS_DATA.map(p=>(
            <span key={p.id} onClick={()=>{setName(p.name);setErr("");}}
              style={{padding:"4px 10px",borderRadius:20,fontSize:12,background:"rgba(255,215,0,0.1)",color:"rgba(255,215,0,0.8)",cursor:"pointer",border:"1px solid rgba(255,215,0,0.2)"}}>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameCard({game, result, guess, showGuess}) {
  const pts = guess&&result ? calcPoints(guess,result) : null;
  const cor = pts===3?"#4ade80":pts===1?"#FFD700":pts===0?"#ff6b6b":"transparent";
  const borderColor = pts!==null ? cor+"55" : "rgba(255,255,255,0.08)";
  return (
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid "+borderColor,borderRadius:12,padding:"11px 14px",marginBottom:7}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,textAlign:"right"}}>
          <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{FLAGS[game.hc]} {game.home}</span>
        </div>
        <div style={{textAlign:"center",minWidth:90}}>
          <div style={{textAlign:"center"}}>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:10,marginBottom:2}}>{game.date}</div>
            {result ? (
              <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"center"}}>
                <span style={{color:"#FFD700",fontWeight:800,fontSize:17}}>{result.h}</span>
                <span style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>x</span>
                <span style={{color:"#FFD700",fontWeight:800,fontSize:17}}>{result.a}</span>
              </div>
            ) : (
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>a realizar</div>
            )}
          </div>
          {showGuess&&guess&&(
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>palpite: {guess.h}x{guess.a}</div>
          )}
        </div>
        <div style={{flex:1}}>
          <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{game.away} {FLAGS[game.ac]}</span>
        </div>
        {pts!==null&&(
          <div style={{padding:"2px 7px",borderRadius:20,fontSize:11,fontWeight:700,background:cor+"22",color:cor,minWidth:50,textAlign:"center"}}>
            {pts===3?"3pts":pts===1?"1pt":"0"}
          </div>
        )}
      </div>
    </div>
  );
}

function RankingScreen({results, currentUser}) {
  const ranking = PARTICIPANTS_DATA
    .map(function(p){ return Object.assign({}, p, {pts: calcTotal(p.id, results)}); })
    .sort(function(a,b){ return b.pts - a.pts; });

  const medals = ["🥇","🥈","🥉","4º","5º","6º","7º","8º","9º","10º"];

  // Montar objeto de totais e salvar snapshot do dia (só salva uma vez por dia)
  var totalsNow = {};
  ranking.forEach(function(p){ totalsNow[p.id] = p.pts; });
  saveSnapshotIfNeeded(totalsNow);

  // Calcular deltas de todos comparando com snapshot de ontem
  var deltaMap = calcDeltaMap(totalsNow);

  // Data de hoje formatada
  var brt = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Sao_Paulo"}));
  var dataHoje = String(brt.getDate()).padStart(2,"0")+"/"+String(brt.getMonth()+1).padStart(2,"0");

  var hasDelta = deltaMap !== null;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:hasDelta?8:16}}>
        <h2 style={{color:"#fff",fontSize:20,fontWeight:800,margin:0}}>🏆 Classificação</h2>
        <span style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>Fase de Grupos</span>
      </div>

      {hasDelta && (
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16,
          background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.18)",
          borderRadius:10,padding:"7px 12px"}}>
          <span style={{fontSize:13}}>📈</span>
          <span style={{color:"#4ade80",fontSize:12,fontWeight:600}}>
            Pontos conquistados hoje — {dataHoje}
          </span>
        </div>
      )}

      {ranking.map(function(p, i) {
        var isMe = p.id === currentUser.id;
        var delta = deltaMap ? deltaMap[p.id] : null;

        var deltaBadge = null;
        if (delta !== null) {
          if (delta > 0) {
            deltaBadge = (
              <span style={{
                display:"inline-flex",alignItems:"center",gap:2,
                background:"rgba(74,222,128,0.15)",
                color:"#4ade80",
                fontSize:11,fontWeight:800,
                padding:"2px 9px",borderRadius:20,
                border:"1px solid rgba(74,222,128,0.35)"
              }}>+{delta} pts</span>
            );
          } else {
            deltaBadge = (
              <span style={{
                display:"inline-flex",alignItems:"center",
                background:"rgba(255,255,255,0.04)",
                color:"rgba(255,255,255,0.25)",
                fontSize:11,fontWeight:500,
                padding:"2px 9px",borderRadius:20,
                border:"1px solid rgba(255,255,255,0.06)"
              }}>+0</span>
            );
          }
        }

        return (
          <div key={p.id} style={{
            display:"flex",alignItems:"center",gap:12,
            padding:"13px 16px",borderRadius:14,marginBottom:8,
            background:isMe
              ? "linear-gradient(135deg,rgba(255,215,0,0.13),rgba(255,165,0,0.06))"
              : "rgba(255,255,255,0.04)",
            border:isMe
              ? "1px solid rgba(255,215,0,0.3)"
              : "1px solid rgba(255,255,255,0.07)"
          }}>
            <span style={{fontSize:20,minWidth:32,textAlign:"center"}}>{medals[i]}</span>

            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{color:isMe?"#FFD700":"#fff",fontWeight:700,fontSize:15}}>
                  {p.name}
                </span>
                {isMe && (
                  <span style={{color:"rgba(255,215,0,0.45)",fontSize:10}}>você</span>
                )}
              </div>
              {deltaBadge && (
                <div style={{marginTop:4}}>{deltaBadge}</div>
              )}
            </div>

            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{color:"#FFD700",fontWeight:900,fontSize:23,lineHeight:1}}>{p.pts}</div>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,marginTop:2}}>pts</div>
            </div>
          </div>
        );
      })}

      {!hasDelta && (
        <div style={{textAlign:"center",padding:"12px 0 4px",color:"rgba(255,255,255,0.2)",fontSize:11}}>
          Os badges +pts aparecem a partir do segundo dia de uso
        </div>
      )}
    </div>
  );
}

function TodayGames({todayGames, results}) {
  if (!todayGames || todayGames.length === 0) return null;

  const NAME_MAP = {
    "NOR":"Noruega","FRA":"França","SEN":"Senegal","IRQ":"Iraque",
    "URU":"Uruguai","ESP":"Espanha","CPV":"Cabo Verde","KSA":"Arábia Saudita",
    "NZL":"Nova Zelândia","BEL":"Bélgica","EGY":"Egito","IRN":"Irã",
    "PAN":"Panamá","ENG":"Inglaterra","CRO":"Croácia","GHA":"Gana",
    "COL":"Colômbia","POR":"Portugal","COD":"RD Congo","UZB":"Uzbequistão",
    "MEX":"México","RSA":"África do Sul","KOR":"Coreia do Sul","CZE":"Rep. Tcheca",
    "CAN":"Canadá","BIH":"Bósnia","QAT":"Catar","SUI":"Suíça",
    "BRA":"Brasil","MAR":"Marrocos","HTI":"Haiti","SCO":"Escócia",
    "USA":"EUA","PAR":"Paraguai","AUS":"Austrália","TUR":"Turquia",
    "GER":"Alemanha","CUW":"Curaçao","CIV":"Costa do Marfim","ECU":"Equador",
    "NED":"Holanda","JPN":"Japão","SWE":"Suécia","TUN":"Tunísia",
    "BEL":"Bélgica","EGY":"Egito","IRN":"Irã","NZL":"Nova Zelândia",
    "ARG":"Argentina","ALG":"Argélia","AUT":"Áustria","JOR":"Jordânia",
  };

  const hoje = new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});

  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:18}}>📅</span>
        <h3 style={{color:"#fff",fontSize:16,fontWeight:800,margin:0}}>Jogos de Hoje — {hoje}</h3>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {todayGames.map(g=>{
          const isLive = g.status === "live" || g.status === "inprogress";
          const isDone = g.status === "final" || g.status === "closed";
          const homeName = NAME_MAP[g.home] || g.home;
          const awayName = NAME_MAP[g.away] || g.away;
          const homeScore = g.homeScore;
          const awayScore = g.awayScore;

          // Formatar horário
          const hora = g.date ? g.date.split(" ")[1] || "" : "";

          return (
            <div key={g.id} style={{
              background: isLive ? "rgba(255,68,68,0.08)" : isDone ? "rgba(255,255,255,0.04)" : "rgba(255,215,0,0.04)",
              border: isLive ? "1px solid rgba(255,68,68,0.4)" : isDone ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,215,0,0.15)",
              borderRadius:14,
              padding:"14px 16px",
            }}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <div style={{flex:1,textAlign:"right"}}>
                  <div style={{color:"#fff",fontSize:14,fontWeight:700}}>{FLAGS[g.home]} {homeName}</div>
                </div>
                <div style={{textAlign:"center",minWidth:100}}>
                  {isLive && (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginBottom:4}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:"#ff4444",animation:"pulse 1s infinite"}}/>
                      <span style={{color:"#ff4444",fontSize:10,fontWeight:800}}>AO VIVO</span>
                    </div>
                  )}
                  {!isLive && !isDone && hora && (
                    <div style={{color:"rgba(255,215,0,0.7)",fontSize:11,fontWeight:600,marginBottom:4}}>{hora}</div>
                  )}
                  {isDone && (
                    <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,marginBottom:4}}>Encerrado</div>
                  )}
                  <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}>
                    <span style={{
                      color: isLive?"#ff6b6b": isDone?"#FFD700":"rgba(255,255,255,0.4)",
                      fontWeight:900,fontSize:isLive||isDone?22:16
                    }}>
                      {homeScore !== null ? homeScore : "-"}
                    </span>
                    <span style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>x</span>
                    <span style={{
                      color: isLive?"#ff6b6b": isDone?"#FFD700":"rgba(255,255,255,0.4)",
                      fontWeight:900,fontSize:isLive||isDone?22:16
                    }}>
                      {awayScore !== null ? awayScore : "-"}
                    </span>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontSize:14,fontWeight:700}}>{awayName} {FLAGS[g.away]}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"20px 0 4px"}}/>
    </div>
  );
}

function ResultsScreen({results,todayGames}) {
  const [grp,setGrp]=useState("Todos");
  const grupos=["Todos","A","B","C","D","E","F","G","H","I","J","K","L"];
  const filtered=grp==="Todos"?GROUP_GAMES:GROUP_GAMES.filter(g=>g.g===grp);
  return (
    <div>
      <TodayGames todayGames={todayGames} results={results}/>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:14}}>📊 Todos os Jogos</h2>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
        {grupos.map(g=>(
          <button key={g} onClick={()=>setGrp(g)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",
            background:grp===g?"#FFD700":"rgba(255,255,255,0.08)",color:grp===g?"#0a0e1a":"rgba(255,255,255,0.7)",
            fontWeight:600,fontSize:13,whiteSpace:"nowrap",flexShrink:0}}>
            {g==="Todos"?"Todos":"Grupo "+g}
          </button>
        ))}
      </div>
      {filtered.map(game=><GameCard key={game.id} game={game} result={results[game.id]}/>)}
    </div>
  );
}

function PalpitesMenu({currentUser,onSelect,results}) {
  return (
    <div>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:6}}>Palpites — Fase de Grupos</h2>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:18}}>Selecione um participante</p>
      {PARTICIPANTS_DATA.map(p=>{
        const pts=calcTotal(p.id,results), isMe=p.id===currentUser.id;
        return (
          <div key={p.id} onClick={()=>onSelect(p)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"13px 18px",borderRadius:14,marginBottom:8,cursor:"pointer",
            background:isMe?"rgba(255,215,0,0.1)":"rgba(255,255,255,0.04)",
            border:isMe?"1px solid rgba(255,215,0,0.25)":"1px solid rgba(255,255,255,0.07)"}}>
            <span style={{color:isMe?"#FFD700":"#fff",fontWeight:600}}>{p.name}{isMe?" (você)":""}</span>
            <span style={{color:"rgba(255,255,255,0.45)",fontSize:14}}>{pts} pts →</span>
          </div>
        );
      })}
    </div>
  );
}

function PalpitesDetalhe({participant,results,onBack}) {
  const [grp,setGrp]=useState("A");
  const guesses=GROUP_GUESSES[participant.id]||{};
  const grupos=["A","B","C","D","E","F","G","H","I","J","K","L"];
  const pts=calcTotal(participant.id,results);
  return (
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:14,marginBottom:14,padding:0}}>← Voltar</button>
      <h2 style={{color:"#fff",fontSize:19,fontWeight:800,marginBottom:4}}>{participant.name}</h2>
      <div style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.2)",borderRadius:10,padding:"8px 16px",display:"inline-block",marginBottom:16}}>
        <span style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>Total: </span>
        <span style={{color:"#FFD700",fontWeight:900,fontSize:20}}>{pts} pts</span>
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
        {grupos.map(g=>(
          <button key={g} onClick={()=>setGrp(g)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",
            background:grp===g?"#FFD700":"rgba(255,255,255,0.08)",color:grp===g?"#0a0e1a":"rgba(255,255,255,0.7)",
            fontWeight:600,fontSize:13,whiteSpace:"nowrap",flexShrink:0}}>{g}</button>
        ))}
      </div>
      {GROUP_GAMES.filter(g=>g.g===grp).map(game=>{
        const nao=ANTES_C1.has(game.id)&&(participant.id==="antonio_carlos"||participant.id==="teresinha");
        if(nao) return (
          <div key={game.id} style={{background:"rgba(255,255,255,0.02)",borderRadius:12,padding:"11px 14px",marginBottom:7,
            border:"1px solid rgba(255,255,255,0.05)",textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:12}}>
            {game.home} x {game.away} — não participou
          </div>
        );
        return <GameCard key={game.id} game={game} result={results[game.id]} guess={guesses[game.id]} showGuess={true}/>;
      })}
    </div>
  );
}

function KnockoutScreen() {
  return (
    <div style={{textAlign:"center",padding:"48px 20px"}}>
      <div style={{fontSize:52,marginBottom:14}}>🔒</div>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:8}}>Mata-Mata — Em breve</h2>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:14,maxWidth:280,margin:"0 auto",lineHeight:1.6}}>
        Abre assim que a fase de grupos encerrar e os confrontos forem definidos.
      </p>
    </div>
  );
}

function AdminScreen({results,onUpdate,currentUser}) {
  const [gid,setGid]=useState(""), [hg,setHg]=useState(""), [ag,setAg]=useState(""), [ok,setOk]=useState(false);
  if(!currentUser.isAdmin) return <div style={{textAlign:"center",padding:40}}><div style={{fontSize:48}}>🚫</div><p style={{color:"rgba(255,255,255,0.5)"}}>Apenas o admin.</p></div>;
  const save=()=>{
    if(!gid||hg===""||ag==="")return;
    onUpdate(gid,{h:parseInt(hg),a:parseInt(ag)});
    setOk(true); setTimeout(()=>setOk(false),2000); setGid(""); setHg(""); setAg("");
  };
  const sel=GROUP_GAMES.find(g=>g.id===gid);
  return (
    <div>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:6}}>Admin — Corrigir Placar</h2>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:18}}>Resultados buscados automaticamente. Use para correções manuais.</p>
      <div style={{marginBottom:12}}>
        <select value={gid} onChange={e=>setGid(e.target.value)}
          style={{width:"100%",padding:12,borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:14,outline:"none"}}>
          <option value="">Selecione o jogo...</option>
          {GROUP_GAMES.map(g=><option key={g.id} value={g.id}>{g.id}: {g.home} x {g.away}</option>)}
        </select>
      </div>
      {sel&&(
        <div style={{display:"flex",gap:12,marginBottom:14,alignItems:"center"}}>
          <div style={{flex:1}}>
            <label style={{color:"rgba(255,255,255,0.6)",fontSize:13,display:"block",marginBottom:6}}>{FLAGS[sel.hc]} {sel.home}</label>
            <input type="number" min="0" max="20" value={hg} onChange={e=>setHg(e.target.value)}
              style={{width:"100%",padding:12,borderRadius:10,textAlign:"center",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#FFD700",fontSize:24,fontWeight:800,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{color:"rgba(255,255,255,0.3)",fontSize:22,marginTop:22}}>x</div>
          <div style={{flex:1}}>
            <label style={{color:"rgba(255,255,255,0.6)",fontSize:13,display:"block",marginBottom:6}}>{FLAGS[sel.ac]} {sel.away}</label>
            <input type="number" min="0" max="20" value={ag} onChange={e=>setAg(e.target.value)}
              style={{width:"100%",padding:12,borderRadius:10,textAlign:"center",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#FFD700",fontSize:24,fontWeight:800,outline:"none",boxSizing:"border-box"}}/>
          </div>
        </div>
      )}
      <button onClick={save} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:ok?"#4ade80":"linear-gradient(135deg,#FFD700,#FFA500)",color:"#0a0e1a",fontSize:15,fontWeight:800,cursor:"pointer"}}>
        {ok?"Salvo!":"Salvar Resultado"}
      </button>
      <div style={{marginTop:28}}>
        <h3 style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginBottom:10}}>Resultados cadastrados</h3>
        {GROUP_GAMES.filter(g=>results[g.id]).map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 12px",borderRadius:8,background:"rgba(255,255,255,0.04)",marginBottom:4}}>
            <span style={{color:"rgba(255,255,255,0.55)",fontSize:13}}>{g.id}: {g.home} x {g.away}</span>
            <span style={{color:"#FFD700",fontWeight:700,fontSize:13}}>{results[g.id].h} x {results[g.id].a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// SISTEMA DE DELTA DIÁRIO — pontos ganhos no dia
// Salva snapshot às 3h da manhã (ou na primeira abertura do dia)
// ============================================================
function getDailyKey() {
  var now = new Date();
  var brt = new Date(now.toLocaleString("en-US",{timeZone:"America/Sao_Paulo"}));
  // Se for antes das 3h, considera o dia anterior
  if(brt.getHours() < 3) {
    brt.setDate(brt.getDate()-1);
  }
  return "bolao_snapshot_"+brt.getFullYear()+"_"+(brt.getMonth()+1)+"_"+brt.getDate();
}

function getPrevKey() {
  var now = new Date();
  var brt = new Date(now.toLocaleString("en-US",{timeZone:"America/Sao_Paulo"}));
  if(brt.getHours() < 3) brt.setDate(brt.getDate()-1);
  brt.setDate(brt.getDate()-1);
  return "bolao_snapshot_"+brt.getFullYear()+"_"+(brt.getMonth()+1)+"_"+brt.getDate();
}

function saveSnapshot(totals) {
  try {
    var key = getDailyKey();
    if(!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(totals));
    }
  } catch(e) {}
}

function getDelta(pid, currentPts) {
  try {
    var prevKey = getPrevKey();
    var prev = localStorage.getItem(prevKey);
    if(!prev) return null;
    var data = JSON.parse(prev);
    return data[pid] !== undefined ? currentPts - data[pid] : null;
  } catch(e) { return null; }
}


// ============================================================
// SISTEMA DELTA DIÁRIO
// "Virador do dia" = 3h da manhã (horário Brasília)
// Salva snapshot dos pontos na chave do dia corrente
// Delta = pontos atuais − snapshot do dia anterior
// localStorage funciona no Netlify, não no preview do Claude
// ============================================================
function getBRTDate(offsetDays) {
  var now = new Date();
  var brt = new Date(now.toLocaleString("en-US", {timeZone:"America/Sao_Paulo"}));
  if (brt.getHours() < 3) brt.setDate(brt.getDate() - 1); // antes das 3h = ainda é "ontem"
  if (offsetDays) brt.setDate(brt.getDate() + offsetDays);
  return brt.getFullYear() + "-" + String(brt.getMonth()+1).padStart(2,"0") + "-" + String(brt.getDate()).padStart(2,"0");
}

function snapshotKey(dateStr) { return "bolao26_snap_" + dateStr; }

function saveSnapshotIfNeeded(totals) {
  try {
    var key = snapshotKey(getBRTDate(0));
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(totals));
    }
  } catch(e) {}
}

function loadSnapshot(dateStr) {
  try {
    var raw = localStorage.getItem(snapshotKey(dateStr));
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function calcDeltaMap(currentTotals) {
  var yesterday = getBRTDate(-1);
  var snap = loadSnapshot(yesterday);
  if (!snap) return null; // primeiro dia, sem referência
  var delta = {};
  Object.keys(currentTotals).forEach(function(pid) {
    delta[pid] = (currentTotals[pid] || 0) - (snap[pid] || 0);
  });
  return delta;
}

export default function App() {
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState("ranking");
  const [results,setResults]=useState(KNOWN_RESULTS);
  const [todayGames,setTodayGames]=useState([]);
  const [viewing,setViewing]=useState(null);
  const [lastUpd,setLastUpd]=useState(null);

  const fetchResults = useCallback(async function() {
    try {
      const res = await fetch("/.netlify/functions/scores");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();

      if (data.results) {
        setResults(function(prev){ return Object.assign({}, prev, data.results); });
      }
      if (data.today && Array.isArray(data.today)) {
        setTodayGames(function(prev) {
          return prev.map(function(g) {
            var upd = data.today.find(function(t){ return t.id === g.id; });
            if (upd) return Object.assign({}, g, {status:upd.status, homeScore:upd.h, awayScore:upd.a});
            return g;
          });
        });
      }
      setLastUpd(new Date());
    } catch(e) {
      console.error("Fetch error:", e);
      setLastUpd(new Date());
    }
  },[]);

  // Calcular jogos de hoje a partir dos dados locais (GROUP_GAMES)
  // Mapeamento de ID para data/hora real (horário Brasília)
  const GAME_DATES = {
    "A1":"2026-06-11","A2":"2026-06-11","A3":"2026-06-18","A4":"2026-06-18","A5":"2026-06-24","A6":"2026-06-24",
    "B1":"2026-06-12","B2":"2026-06-13","B3":"2026-06-18","B4":"2026-06-18","B5":"2026-06-24","B6":"2026-06-24",
    "C1":"2026-06-13","C2":"2026-06-13","C3":"2026-06-19","C4":"2026-06-19","C5":"2026-06-24","C6":"2026-06-24",
    "D1":"2026-06-12","D2":"2026-06-14","D3":"2026-06-20","D4":"2026-06-19","D5":"2026-06-25","D6":"2026-06-25",
    "E1":"2026-06-14","E2":"2026-06-14","E3":"2026-06-20","E4":"2026-06-20","E5":"2026-06-25","E6":"2026-06-25",
    "F1":"2026-06-14","F2":"2026-06-14","F3":"2026-06-20","F4":"2026-06-20","F5":"2026-06-25","F6":"2026-06-25",
    "G1":"2026-06-15","G2":"2026-06-15","G3":"2026-06-21","G4":"2026-06-21","G5":"2026-06-27","G6":"2026-06-27",
    "H1":"2026-06-15","H2":"2026-06-15","H3":"2026-06-21","H4":"2026-06-21","H5":"2026-06-26","H6":"2026-06-26",
    "I1":"2026-06-16","I2":"2026-06-16","I3":"2026-06-22","I4":"2026-06-22","I5":"2026-06-26","I6":"2026-06-26",
    "J1":"2026-06-16","J2":"2026-06-17","J3":"2026-06-22","J4":"2026-06-23","J5":"2026-06-27","J6":"2026-06-27",
    "K1":"2026-06-17","K2":"2026-06-17","K3":"2026-06-23","K4":"2026-06-23","K5":"2026-06-27","K6":"2026-06-27",
    "L1":"2026-06-17","L2":"2026-06-17","L3":"2026-06-23","L4":"2026-06-23","L5":"2026-06-27","L6":"2026-06-27",
  };

  function getTodayGames(results) {
    const now = new Date();
    const brt = new Date(now.toLocaleString("en-US", {timeZone:"America/Sao_Paulo"}));
    const todayStr = brt.getFullYear()+"-"+String(brt.getMonth()+1).padStart(2,"0")+"-"+String(brt.getDate()).padStart(2,"0");
    return GROUP_GAMES.filter(function(g) {
      return GAME_DATES[g.id] === todayStr;
    }).map(function(g) {
      const result = results[g.id];
      const isDone = !!result;
      return {
        id: g.id,
        home: g.hc,
        away: g.ac,
        homeName: g.home,
        awayName: g.away,
        status: isDone ? "final" : "scheduled",
        homeScore: result ? result.h : null,
        awayScore: result ? result.a : null,
        date: g.date,
      };
    });
  }

  useEffect(function(){
    if(user){
      // Jogos de hoje calculados localmente (sem IA - usa datas do sistema)
      setTodayGames(getTodayGames(KNOWN_RESULTS));
      // Busca resultados reais via Netlify Function (a cada 2 min)
      fetchResults();
      const t = setInterval(fetchResults, 60 * 1000);
      return function(){ clearInterval(t); };
    }
  },[user, fetchResults]);

  if(!user) return <LoginScreen onLogin={setUser}/>;

  const TABS=[
    {id:"ranking",label:"🏆",title:"Ranking"},
    {id:"results",label:"📊",title:"Jogos"},
    {id:"guesses",label:"📋",title:"Palpites"},
    {id:"knockout",label:"⚔️",title:"Mata-Mata"},
  ].concat(user.isAdmin?[{id:"admin",label:"⚙️",title:"Admin"}]:[]);

  function renderContent(){
    if(tab==="ranking") return <RankingScreen results={results} currentUser={user}/>;
    if(tab==="results") return <ResultsScreen results={results} todayGames={todayGames}/>;
    if(tab==="guesses"){
      if(viewing) return <PalpitesDetalhe participant={viewing} results={results} onBack={function(){setViewing(null);}}/>;
      return <PalpitesMenu currentUser={user} onSelect={setViewing} results={results}/>;
    }
    if(tab==="knockout") return <KnockoutScreen/>;
    if(tab==="admin") return <AdminScreen results={results} onUpdate={function(id,score){setResults(function(p){var n=Object.assign({},p); n[id]=score; return n;});}} currentUser={user}/>;
    return null;
  }

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0a0e1a,#0f1828)",fontFamily:"'Segoe UI',system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:"rgba(0,0,0,0.4)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"13px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
        <div>
          <div style={{color:"#FFD700",fontWeight:800,fontSize:16}}>Bolao Copa 2026</div>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:1}}>
            {lastUpd ? "Atualizado "+lastUpd.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}) : "Carregando..."}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={fetchResults} style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.2)",color:"#FFD700",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:14}}>🔄</button>
          <span onClick={function(){setUser(null);setTab("ranking");}} style={{color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer"}}>{user.name} sair</span>
        </div>
      </div>
      <div style={{padding:"18px 16px",maxWidth:600,margin:"0 auto"}}>{renderContent()}</div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(10,14,26,0.95)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",justifyContent:"space-around",padding:"8px 0 12px",zIndex:100}}>
        {TABS.map(function(t){return (
          <button key={t.id} onClick={function(){setTab(t.id);setViewing(null);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 8px"}}>
            <span style={{fontSize:20}}>{t.label}</span>
            <span style={{fontSize:10,fontWeight:600,color:tab===t.id?"#FFD700":"rgba(255,255,255,0.4)"}}>{t.title}</span>
            {tab===t.id&&<div style={{width:20,height:2,borderRadius:1,background:"#FFD700"}}/>}
          </button>
        );})}
      </div>
      <style>{"*{-webkit-tap-highlight-color:transparent}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}select option{background:#1a1f2e}"}</style>
    </div>
  );
}
