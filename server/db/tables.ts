import { sqliteTable, text, integer, blob, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const images = sqliteTable('images', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  base64: blob('base64').notNull()
}, (images) => {
  return {
    userIdIndex: uniqueIndex('images_id_index').on(images.id)
  }
})
