module.exports.testeGet = async(req, res) => {
    try {
        res.status(200).json({ log: `teste realizado com sucesso ${process.env.TESTE}`, status: true });
    } catch (err) {
        res.json({ err, status: false });
    }
};