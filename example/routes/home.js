const homeHandler = async (req, res) => {
    const { AssetModel } = res.locals;
    const dbPayload = {
        title: 'Lorem Ipsum',
        slug: 'lorem-ipsum'
      };
    const saveCategory = await AssetModel.insertOne(dbPayload);
    res.send(saveCategory)
}

module.exports = homeHandler;