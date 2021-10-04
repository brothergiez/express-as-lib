const sequelizeHandler = async (req, res) => {
    const { SiswaDbConnector } = res.locals;
    const dbPayload = {
        nama: 'John Doe'
    };
    const user = await SiswaDbConnector.insert(dbPayload);
    res.send(user.dataValues)
};

const sequelizeOthersHandler = async (req, res) => {
    const { NilaiDbConnector } = res.locals;
    const dbPayload = {
        siswaId: 1,
        nilai: 9
    };
    const nilai = await NilaiDbConnector.save(dbPayload);
    res.send(nilai)
};


module.exports = {sequelizeHandler, sequelizeOthersHandler};