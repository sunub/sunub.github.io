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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var client_1 = require("@prisma/client");
var index_mjs_1 = require(".contentlayer/generated/index.mjs");
var chalk_1 = require("chalk");
var ora_1 = require("ora");
var prisma = new client_1.PrismaClient();
function image(_a) {
    var altText = _a.altText, filePath = _a.filePath;
    return __awaiter(this, void 0, void 0, function () {
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = {
                        altText: altText,
                        contentType: filePath.endsWith(".png") ? "image/png" : "image/jpeg"
                    };
                    return [4 /*yield*/, fs_1.default.promises.readFile(filePath)];
                case 1: return [2 /*return*/, (_b.blob = _c.sent(),
                        _b)];
            }
        });
    });
}
function seedPostFiles(postData) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, postData_1, post, postImages, _a, _b, imagePath, filePath, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _i = 0, postData_1 = postData;
                    _e.label = 1;
                case 1:
                    if (!(_i < postData_1.length)) return [3 /*break*/, 10];
                    post = postData_1[_i];
                    if (!(post.images.length > 0)) return [3 /*break*/, 7];
                    postImages = [];
                    _a = 0, _b = post.images;
                    _e.label = 2;
                case 2:
                    if (!(_a < _b.length)) return [3 /*break*/, 5];
                    imagePath = _b[_a];
                    filePath = path_1.default.join(process.cwd(), "public/".concat(imagePath));
                    _d = (_c = postImages).push;
                    return [4 /*yield*/, image({ altText: post.title, filePath: filePath })];
                case 3:
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, prisma.post.create({
                        select: { id: true },
                        data: {
                            slug: post.slug,
                            tags: {
                                create: post.tags.map(function (tag) { return ({ name: tag }); }),
                            },
                            images: {
                                create: postImages.map(function (image) { return ({
                                    altText: image.altText,
                                    contentType: image.contentType,
                                    blob: image.blob,
                                }); }),
                            },
                        },
                    })];
                case 6:
                    _e.sent();
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, prisma.post.create({
                        select: { id: true },
                        data: {
                            slug: post.slug,
                            tags: {
                                create: post.tags.map(function (tag) { return ({ name: tag }); }),
                            },
                        },
                    })];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function createRedirectPaths() {
    var result = [];
    for (var _i = 0, allWebPosts_1 = index_mjs_1.allWebPosts; _i < allWebPosts_1.length; _i++) {
        var post = allWebPosts_1[_i];
        var source = "/".concat(post.category, "/").concat(post.slug);
        var destination = "/post/".concat(post.category, "/").concat(post.slug);
        result.push({ source: source, destination: destination });
    }
    for (var _a = 0, allCSPosts_1 = index_mjs_1.allCSPosts; _a < allCSPosts_1.length; _a++) {
        var post = allCSPosts_1[_a];
        var source = "/".concat(post.category, "/").concat(post.slug);
        var destination = "/post/".concat(post.category, "/").concat(post.slug);
        result.push({ source: source, destination: destination });
    }
    for (var _b = 0, allCodePosts_1 = index_mjs_1.allCodePosts; _b < allCodePosts_1.length; _b++) {
        var post = allCodePosts_1[_b];
        var source = "/".concat(post.category, "/").concat(post.slug);
        var destination = "/post/".concat(post.category, "/").concat(post.slug);
        result.push({ source: source, destination: destination });
    }
    for (var _c = 0, allAlgorithmPosts_1 = index_mjs_1.allAlgorithmPosts; _c < allAlgorithmPosts_1.length; _c++) {
        var post = allAlgorithmPosts_1[_c];
        var source = "/".concat(post.category, "/").concat(post.slug);
        var destination = "/post/".concat(post.category, "/").concat(post.slug);
        result.push({ source: source, destination: destination });
    }
    return result;
}
function seedRedirects() {
    return __awaiter(this, void 0, void 0, function () {
        var redirects, _i, redirects_1, redirect, source, destination;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    redirects = createRedirectPaths();
                    _i = 0, redirects_1 = redirects;
                    _a.label = 1;
                case 1:
                    if (!(_i < redirects_1.length)) return [3 /*break*/, 4];
                    redirect = redirects_1[_i];
                    source = redirect.source, destination = redirect.destination;
                    return [4 /*yield*/, prisma.redirects.create({
                            select: { id: true },
                            data: {
                                source: source,
                                destination: destination,
                            },
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var log = console.log;
var spinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "..."));
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var cleanupSpinner, _a, cleanupSpinner, webPostSpinner, _b, webPostSpinner, csPostSpinner, _c, csPostSpinner, codePostSpinner, _d, codePostSpinner, algorithmPostSpinner, _e, algorithmPostSpinner, redirectsSpinner, _f, redirectsSpinner;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    log(chalk_1.default.bgGreen(" Seeding..."));
                    console.time(chalk_1.default.green("\uD83C\uDF31 Database has been seeded"));
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, , 7]);
                    cleanupSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...\n")).start();
                    console.time("🧹 Cleaned up the database...");
                    return [4 /*yield*/, prisma.tags.deleteMany()];
                case 2:
                    _g.sent();
                    return [4 /*yield*/, prisma.postImages.deleteMany()];
                case 3:
                    _g.sent();
                    return [4 /*yield*/, prisma.post.deleteMany()];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, prisma.redirects.deleteMany()];
                case 5:
                    _g.sent();
                    cleanupSpinner.succeed(chalk_1.default.green("Database has been cleaned up!!"));
                    console.timeEnd("🧹 Cleaned up the database...");
                    return [3 /*break*/, 7];
                case 6:
                    _a = _g.sent();
                    cleanupSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    cleanupSpinner.fail(chalk_1.default.redBright("Failed to clean up the database"));
                    return [3 /*break*/, 7];
                case 7:
                    log("\n");
                    log(chalk_1.default.bgBlue(" Seed post data..."));
                    _g.label = 8;
                case 8:
                    _g.trys.push([8, 10, , 11]);
                    webPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...\n")).start();
                    console.time("📝 Created web posts...");
                    return [4 /*yield*/, seedPostFiles(index_mjs_1.allWebPosts)];
                case 9:
                    _g.sent();
                    webPostSpinner.succeed(chalk_1.default.green("Web Post has been seeded!!"));
                    console.timeEnd("📝 Created web posts...");
                    return [3 /*break*/, 11];
                case 10:
                    _b = _g.sent();
                    webPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    webPostSpinner.fail(chalk_1.default.redBright("Failed to seed web posts"));
                    return [3 /*break*/, 11];
                case 11:
                    _g.trys.push([11, 13, , 14]);
                    csPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...\n")).start();
                    console.time("📝 Created cs posts...");
                    return [4 /*yield*/, seedPostFiles(index_mjs_1.allCSPosts)];
                case 12:
                    _g.sent();
                    csPostSpinner.succeed(chalk_1.default.green("CS Post has been seeded!!"));
                    console.timeEnd("📝 Created cs posts...");
                    return [3 /*break*/, 14];
                case 13:
                    _c = _g.sent();
                    csPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    csPostSpinner.fail(chalk_1.default.redBright("Failed to seed cs posts"));
                    return [3 /*break*/, 14];
                case 14:
                    _g.trys.push([14, 16, , 17]);
                    codePostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...")).start();
                    console.time("📝 Created code posts...");
                    return [4 /*yield*/, seedPostFiles(index_mjs_1.allCodePosts)];
                case 15:
                    _g.sent();
                    codePostSpinner.succeed(chalk_1.default.green("Code Post has been seeded!!"));
                    console.timeEnd("📝 Created code posts...");
                    return [3 /*break*/, 17];
                case 16:
                    _d = _g.sent();
                    codePostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    codePostSpinner.fail(chalk_1.default.redBright("Failed to seed code posts"));
                    return [3 /*break*/, 17];
                case 17:
                    _g.trys.push([17, 19, , 20]);
                    algorithmPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...\n")).start();
                    console.time("📝 Created algorithm posts...");
                    return [4 /*yield*/, seedPostFiles(index_mjs_1.allAlgorithmPosts)];
                case 18:
                    _g.sent();
                    algorithmPostSpinner.succeed(chalk_1.default.green("Algorithm Post has been seeded!!"));
                    console.timeEnd("📝 Created algorithm posts...");
                    return [3 /*break*/, 20];
                case 19:
                    _e = _g.sent();
                    algorithmPostSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    algorithmPostSpinner.fail(chalk_1.default.redBright("Failed to seed algorithm posts"));
                    return [3 /*break*/, 20];
                case 20:
                    log("\n");
                    log(chalk_1.default.bgBlue(" Seed post Redirects..."));
                    _g.label = 21;
                case 21:
                    _g.trys.push([21, 23, , 24]);
                    redirectsSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.blueBright("loading")), "...\n")).start();
                    console.time("🖇️ Created redirects...");
                    return [4 /*yield*/, seedRedirects()];
                case 22:
                    _g.sent();
                    redirectsSpinner.succeed(chalk_1.default.green("Redirects has been seeded!!"));
                    console.timeEnd("🖇️ Created redirects...");
                    return [3 /*break*/, 24];
                case 23:
                    _f = _g.sent();
                    redirectsSpinner = (0, ora_1.default)("".concat(chalk_1.default.bold(chalk_1.default.redBright("loading")), "...")).start();
                    redirectsSpinner.fail(chalk_1.default.redBright("Failed to seed redirects"));
                    return [3 /*break*/, 24];
                case 24:
                    console.timeEnd(chalk_1.default.bold(chalk_1.default.green("\uD83C\uDF31 Database has been seeded")));
                    log("\n");
                    log(chalk_1.default.bgBlack(chalk_1.default.greenBright("process completed successfully")));
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
await seed();
