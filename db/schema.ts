import { date, integer, numeric, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name:text().notNull(),
    type: text({
        enum: ['Income', 'Expense']
    }).notNull(),
});

export const transcationsTable = pgTable("transcations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    description: text().notNull(),
    amount:numeric().notNull(),
    transcationsDate:date("transcation_date").notNull(),
    categoryId: integer("category_id").references(()=>categoriesTable.id).notNull()

})