import { neon } from "@neondatabase/serverless";

import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon(
  "postgresql://neondb_owner:npg_ycGaMzVC05FA@ep-still-sea-a82mqc3c-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
);

export const db = drizzle(sql, { schema });
