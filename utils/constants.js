const SECRET_PHRASE = process.env.SECRET_PHRASE;
const MAX_TIME_EXPIRED_TOKEN = 3 * 24 * 60 * 60; // 3 dias
const FRONT_ENDPOINT = "http://localhost:3000";
const DBConfig = {
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    connectionLimit: 5
};

module.exports = { SECRET_PHRASE, MAX_TIME_EXPIRED_TOKEN, FRONT_ENDPOINT, DBConfig };