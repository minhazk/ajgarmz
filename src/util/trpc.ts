import { AppRouter } from '@/server/api/root';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
