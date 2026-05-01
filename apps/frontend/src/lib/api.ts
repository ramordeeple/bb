import { treaty } from '@elysiajs/eden';
import type { App } from '@bb/backend/src';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl)
  throw new Error('NEXT_PUBLIC_API_URL is not set');

export const api = treaty<App>(apiUrl);