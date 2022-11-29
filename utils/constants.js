const SECRET_PHRASE = "G3nsh1n Impact é um ótimo g4me com históri4 fAntástica";
const MAX_TIME_EXPIRED_TOKEN = 3 * 24 * 60 * 60; // 3 dias
const SERVER_PORT_BACKEND = 5500;
const FRONT_ENDPOINT = "http://localhost:3000";
const DBConfig = {
    host: "localhost",
    user: "root",
    password: "kaedaraKazuha",
    database: "pdm_claro",
};

module.exports = { SECRET_PHRASE, MAX_TIME_EXPIRED_TOKEN, SERVER_PORT_BACKEND, FRONT_ENDPOINT, DBConfig };