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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = void 0;
const koa_passport_1 = __importDefault(require("koa-passport"));
const passport_http_1 = require("passport-http");
const users = __importStar(require("../models/users"));
const verifyPassword = (user, password) => {
    return user.password === password;
};
koa_passport_1.default.use(new passport_http_1.BasicStrategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    // if(username === 'admin' && password === 'password') {
    //     done(null, {username: 'admin'});
    // } else {
    //     done(null, false);
    // }
    let result = [];
    try {
        result = yield users.findByUsername(username);
    }
    catch (error) {
        console.error(`Error authentication for user ${username}: ${error}`);
        done(null, false);
    }
    if (result.length) {
        const user = result[0];
        if (verifyPassword(user, password)) {
            done(null, user);
        }
        else {
            console.log(`Password incorrect for ${username}`);
            done(null, false);
        }
    }
    else {
        console.log(`${username} is not found`);
        done(null, false);
    }
})));
const basicAuth = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield koa_passport_1.default.authenticate('basic', { session: false })(ctx, next);
    if (ctx.status == 401) {
        ctx.body = {
            msg: 'You are not authorized'
        };
    }
    else {
        /*ctx.body = {
            msg: 'You are authorized',
            data: ctx.state
        }*/
        return ctx.state;
    }
});
exports.basicAuth = basicAuth;
