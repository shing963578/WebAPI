"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.add = exports.getById = exports.getAll = void 0;
const db = __importStar(require("../helpers/database"));
const getAll = function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: use page, limit, order to give pagination
        let query = "SELECT * FROM articles;";
        let data = yield db.run_query(query, '');
        return data;
    });
};
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "SELECT * FROM articles WHERE ID = ?";
    let values = [id];
    let data = yield db.run_query(query, values);
    return data;
});
exports.getById = getById;
/*testing {
    "title": "title 5",
    "alltext": "some stuff",
    "authorid": 1
}*/
const add = (article) => __awaiter(void 0, void 0, void 0, function* () {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let key = keys.join(',');
    let param = '';
    for (let i = 0; i < values.length; i++) {
        param += '?,';
    }
    ;
    param = param.slice(0, -1);
    let query = `INSERT INTO articles (${key}) VALUES (${param})`;
    try {
        yield db.run_insert(query, values);
        return { status: 201 };
    }
    catch (err) {
        return err;
    }
});
exports.add = add;
const update = (id, article) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE articles SET ";
    let values = { id: id };
    let setClauses = [];
    Object.keys(article).forEach((key) => {
        setClauses.push(`${key} = :${key}`);
        values[key] = article[key];
    });
    query += setClauses.join(', ') + " WHERE id = :id;";
    try {
        yield db.run_update(query, values);
        return { status: 201 };
    }
    catch (err) {
        return err;
    }
});
exports.update = update;
const del = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let query = `DELETE FROM articles WHERE id = :id;`;
    let values = {
        id: id
    };
    try {
        yield db.run_delete(query, values);
        return { status: 201 };
    }
    catch (err) {
        return err;
    }
});
exports.del = del;
