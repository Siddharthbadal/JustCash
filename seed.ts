import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { categoriesTable } from "./db/schema";

dotenv.config({
    path: ".env.local",
});

const db= drizzle(process.env.DATABASE_URL!);
const categoriesSeedData : (typeof categoriesTable.$inferInsert)[] = [
    {
        name: 'Salary',
        type: 'Income'
    },
    {
        name: 'Rental',
        type: 'Income'
    },
    {
        name: 'Business',
        type: 'Income'
    },
    {
        name: 'Gambling',
        type: 'Income'
    },
    {
        name: 'Investments',
        type: 'Income'
    },
    {
        name: 'Other',
        type: 'Income'
    },
    {
        name: 'Food',
        type: 'Expense'
    },
    {
        name: 'Transport',
        type: 'Expense'
    },
    {
        name: 'Medical',
        type: 'Expense'
    },
    {
        name: 'Road Trips',
        type: 'Expense'
    },
    {
        name: 'Education',
        type: 'Expense'
    },
    {
        name: 'Other',
        type: 'Expense'
    },
] 

async function main(){
    await db.insert(categoriesTable).values(categoriesSeedData);
    console.log("Seed data - Done");
    
}

main();