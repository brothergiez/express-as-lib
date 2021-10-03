const generatedModel = (db, model) => {
    const { table, schema } = model;
    const result = db.define(table, schema, {
        freezeTableName: true,
    });
    return result;
}


module.exports = generatedModel;