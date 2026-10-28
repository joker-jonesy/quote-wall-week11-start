// One shared Prisma client for the whole server.
// (Creating many clients would open many database connections.)
const { PrismaClient } = require("@prisma/client");

module.exports = new PrismaClient();
