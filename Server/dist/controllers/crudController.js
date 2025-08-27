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
exports.shareContent = exports.deleteContent = exports.content = exports.newContent = void 0;
const contentModel_1 = __importDefault(require("../models/contentModel"));
const newContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, contentType, title, tag } = req.body;
        const userid = req.userID;
        //checking whether user given all the field or not
        if (!link || !contentType || !title || !userid) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const contentCreated = new contentModel_1.default({
            link: link,
            contentType: contentType,
            title: title,
            tag: tag,
            userId: userid
        });
        yield contentCreated.save();
        res.status(200).json({
            message: "Content saved Successfully"
        });
        return;
    }
    catch (err) {
        console.log("Err(catch): something went wrong", err);
        return;
    }
});
exports.newContent = newContent;
const content = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.userID;
        //checking userid present or not
        if (!userid) {
            res.status(400).json({ message: "Something wrong" });
            return;
        }
        const userData = yield contentModel_1.default.find({ userId: userid });
        res.status(200).json({
            message: "User data fetched successfully",
            data: userData,
        });
        console.log(userData);
    }
    catch (err) {
        console.log("Err(catch): something went wrong", err);
        return;
    }
});
exports.content = content;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.userID;
        const userTitle = req.params.contentId;
        console.log("userid =>", userid);
        console.log("contentid =>", userTitle);
        if (!userid || !userTitle) {
            res.status(400).json({ message: "User ID or Content ID missing" });
            return;
        }
        const content = yield contentModel_1.default.findOne({ title: userTitle, userId: userid });
        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        yield contentModel_1.default.findByIdAndDelete(content);
        res.status(200).json({ message: "Content deleted successfully" });
        return;
    }
    catch (err) {
        console.log("Err(catch): something went wrong", err);
        return;
    }
});
exports.deleteContent = deleteContent;
const shareContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const documents = yield contentModel_1.default.find({ userId });
        res.status(200).json({ data: documents });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.shareContent = shareContent;
