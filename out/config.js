"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres", //Update this parameter
    database: "postgres", //Update this parameter
    connection_limit: 100
};
exports.default = config;
