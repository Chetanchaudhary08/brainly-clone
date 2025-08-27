"use strict";
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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "mysecret";
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = typeof req.headers.token === "string" ? req.headers.token : undefined;
        console.log("token..", token);
        if (!token) {
            res.status(400).json({
                message: "Bad token Request"
            });
            return;
        }
        //comparing token
        if (!SECRET_KEY) {
            res.status(500).json({
                message: "server internal problem"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.userID = decoded.userID;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: `Inavlid or expired token ${err}`
        });
        return;
    }
});
exports.isAuthenticated = isAuthenticated;
