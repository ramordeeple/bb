import { Elysia, t } from 'elysia';
import { eq } from 'drizzle-orm';
import { CreateUserSchema, UserSchema } from '@bb/schemas';
import { db } from '../db';
import { users } from '../db/schema';

const ErrorSchema = t.Object({
  message: t.String(),
});

export const usersRoutes = new Elysia({ prefix: '/users' })
  .post(
    '/',
    async ({ body, status }) => {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email))
        .limit(1);

      if (existing.length > 0) {
        return status(409, { message: 'Email already in use' });
      }

      const passwordHash = await Bun.password.hash(body.password);

      const [created] = await db
        .insert(users)
        .values({
          email: body.email,
          name: body.name,
          passwordHash,
        })
        .returning();

      return {
        id: created.id,
        email: created.email,
        name: created.name,
        createdAt: created.createdAt.toISOString(),
      };
    },
    {
      body: CreateUserSchema,
      response: {
        200: UserSchema,
        409: ErrorSchema,
      },
    }
  )
  .get(
    '/:id',
    async ({ params, status }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, params.id))
        .limit(1);

      if (!user) {
        return status(404, { message: 'User not found' });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      };
    },
    {
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
      response: {
        200: UserSchema,
        404: ErrorSchema,
      },
    }
  );