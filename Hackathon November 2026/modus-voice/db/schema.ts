import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const tickets=sqliteTable('tickets',{id:text('id').primaryKey(),owner:text('owner').notNull(),data:text('data').notNull(),created:integer('created').notNull()});
export const comments=sqliteTable('comments',{id:text('id').primaryKey(),ticket:text('ticket').notNull(),owner:text('owner').notNull(),data:text('data').notNull(),created:integer('created').notNull()});
export const routes=sqliteTable('routes',{owner:text('owner').primaryKey(),data:text('data').notNull()});
export const outbox=sqliteTable('outbox',{id:text('id').primaryKey(),owner:text('owner').notNull(),ticket:text('ticket').notNull(),channel:text('channel').notNull(),status:text('status').notNull(),created:integer('created').notNull()});
