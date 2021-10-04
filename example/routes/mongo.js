const homeHandler = async (req, res) => {
  const { SiswaDbConnector } = res.locals;
  const dbPayload = {
    nama: "John Doe",
  };
  const user = await SiswaDbConnector.insert(dbPayload);
  res.send(user.dataValues);
};

module.exports = homeHandler;
