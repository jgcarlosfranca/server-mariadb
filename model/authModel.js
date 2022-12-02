const mariadb = require('mariadb');
const { DBConfig } = require("../utils/constants")
const pool = mariadb.createPool(DBConfig);

const dbConnectedExec = async() => {
    let conn;
    try {

        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        // rows: [ {val: 1}, meta: ... ]

        const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } finally {
        if (conn) conn.release(); //release to pool
    }
}

const getLogin = async(email, password) => {
    const dbConnected = await pool.getConnection();
    const query =
        "select id_user, nm_user, cd_password from tb_user_auth where `nm_user` = ? ";
    const [rows] = await dbConnected.execute(query, [email]);
    if (rows && rows.length > 0) {
        const auth = await bcrypt.compare(password, rows[0].cd_password);
        if (auth) {
            return rows;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}
const createUser = async(email, password) => {
    const salt = await bcrypt.genSalt();
    const encrypPassword = await bcrypt.hash(password, salt);
    const date = formatDate(new Date(), "dd-mm-yy");
    const dbConnected = await pool.getConnection();
    const queryInsert =
        "insert into tb_user_auth (nm_user, cd_password, dt_criacao) values (?,?,?)";
    const [rows] = await dbConnected.execute(queryInsert, [
        email,
        encrypPassword,
        date,
    ]);
    console.log(rows[0]);
    return rows[0];
}

const getUserAuth = async() => {
    const dbConnected = await pool.getConnection();
    const query = "select nm_user, cd_password from db_user_auth dua;";
    const [rows] = await dbConnected.execute(query);
    return rows;
}

const findUserByDecoded = async(decodedId) => {
    const dbConnected = await pool.getConnection();
    const query = "select id_user, nm_user from tb_user_auth where `id_user` = ? ";
    const [rows] = await dbConnected.execute(query, [decodedId]);
    return rows;
}


module.exports = { dbConnectedExec, getLogin, createUser, getUserAuth, findUserByDecoded }