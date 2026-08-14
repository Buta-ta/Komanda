// Usage: node scripts/make-admin.mjs ton@email.com
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/make-admin.mjs <email>");
  process.exit(1);
}

const result = await prisma.customer.updateMany({
  where: { email },
  data: { isAdmin: true },
});

console.log(`✅ ${result.count} compte(s) passé(s) admin pour ${email}`);
await prisma.$disconnect();
