import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './startup'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, category],
}
