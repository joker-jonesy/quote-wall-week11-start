// Seed script: fills the Quote table with sample data.
// Run with:  npm run db:seed   (safe to re-run; it wipes quotes first)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Whether you think you can, or you think you can't, you're right.", author: "Henry Ford" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
];

async function main() {
  await prisma.quote.deleteMany(); // start clean so re-running doesn't duplicate
  await prisma.quote.createMany({ data: quotes });
  console.log(`Seeded ${quotes.length} quotes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
