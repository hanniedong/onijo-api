"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDbMigrations = exports.getDbConnection = exports.getDbConnectionOptions = void 0;
const typeorm_1 = require("typeorm");
const getDbConnectionOptions = async (connectionName = 'default') => {
    const options = await (0, typeorm_1.getConnectionOptions)(process.env.NODE_ENV || 'development');
    return Object.assign(Object.assign({}, options), { name: connectionName });
};
exports.getDbConnectionOptions = getDbConnectionOptions;
const getDbConnection = async (connectionName = 'default') => {
    return await (0, typeorm_1.getConnection)(connectionName);
};
exports.getDbConnection = getDbConnection;
const runDbMigrations = async (connectionName = 'default') => {
    const conn = await (0, exports.getDbConnection)(connectionName);
    await conn.runMigrations();
};
exports.runDbMigrations = runDbMigrations;
//# sourceMappingURL=database.utils.js.map