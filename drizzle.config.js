export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://neondb_owner:npg_ycGaMzVC05FA@ep-still-sea-a82mqc3c-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
    connectionString:
      "postgresql://neondb_owner:npg_ycGaMzVC05FA@ep-still-sea-a82mqc3c-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
};
