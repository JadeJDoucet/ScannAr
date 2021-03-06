const Sequelize = require('sequelize');

module.exports = (app) => {
  // sequelize connection for production
  const sequelize = new Sequelize('scannar', 'postgres', 'scannar', {
    dialect: 'postgres',
    host: '/cloudsql/scannar-server-second:us-central1:scannar',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      socketPath: '/cloudsql/scannar-server-second:us-central1:scannar',
    },
    logging: false,
    operatorsAliases: false,
  });
  // sequelize connection for development
  // const connectionString = app.get("postgres");
  // const sequelize = new Sequelize(connectionString, {
  //   dialect: "postgres",
  //   database: "ScannAr",
  //   logging: false,
  //   define: {
  //     freezeTableName: true, // Model tableName will be the same as the model name
  //   },
  // });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);
    const { models } = sequelize;
    // Set up data relationships
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });
    // Sync to the database
    app.set(
      'sequelizeSync',
      sequelize
        .sync({ force: true })
        .then(() => {
          console.log('connected to database');
          models.tags.create({
            name: 'Real Estate',
          });
          models.tags.create({
            name: 'Art',
          });
          models.tags.create({
            name: 'Technology',
          });
          models.tags.create({
            name: 'Furniture',
          });
          models.tags.create({
            name: 'Collectables',
          });
          models.tags.create({
            name: 'Miscellaneous',
          });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        }),
    );
    return result;
  };
};
