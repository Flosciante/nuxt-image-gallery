import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const images = sqliteTable('images', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  name: text('username').notNull(),
  base64: text('image').notNull()
}, (images) => {
  return {
    userIdIndex: uniqueIndex('user_id_index').on(images.userId)
  }
})
