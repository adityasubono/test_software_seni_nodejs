const fs = require('fs');

const Sequelize = require('sequelize');
const sequelizeConfig = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

const mode = process.env.MODE || 'development';
const dialect = process.env.DB_DIALECT || sequelizeConfig[mode].dialect || 'sqlite';
const database = process.env.DB_DATABSE || sequelizeConfig[mode].database || 'node_api_ecom_sequelize';
const username = process.env.DB_USERNAME || sequelizeConfig[mode].username || 'root';
const password = process.env.DB_PASSWORD || sequelizeConfig[mode].password || 'root';

const connectionObject = {
    host: process.env.DB_HOST || sequelizeConfig[mode].host || 'localhost',
    dialect, // 'mysql'|'sqlite'|'postgres'|'mssql',
    // operatorsAliases: false,
    // retry: {max: 10},
    pool: {
        max: process.env.DB_POOL_MAX | 5,
        min: process.env.DB_POOL_MIN | 1,
        acquire: process.env.DB_POOL_ACQUIRE | 30000,
        idle: process.env.DB_POOL_IDLE | 10000
    },
};

if (dialect === 'sqlite')
    connectionObject.storage = sequelizeConfig[mode].storage || './app.db';

const sequelize = new Sequelize(database, username, password, connectionObject);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Articel = require('../models/User')(sequelize, Sequelize);
db.Book = require('../models/UserRole')(sequelize, Sequelize);

module.exports = db;
