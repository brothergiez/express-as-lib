const homeHandler = async (req, res) => {
    const { SiswaDbConnector } = res.locals;
    const dbPayload = {
        nama: 'lorem-ipsum'
      };
    const user = await SiswaDbConnector.insert(dbPayload);
    res.send(user.dataValues)
}

module.exports = homeHandler;