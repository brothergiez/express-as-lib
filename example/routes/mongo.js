const mongoHandler = async (req, res) => {
  const { SiswaDbConnector } = res.locals;
  const dbPayload = {
    nama: "John Doe",
  };
  const user = await SiswaDbConnector.insertOne(dbPayload);
  res.send(user);
};

module.exports = mongoHandler;
