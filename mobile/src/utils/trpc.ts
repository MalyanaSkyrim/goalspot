import {createTRPCReact} from '@trpc/react-query';
import type {AppRouter} from '../../../server/src/modules/index';
const trpc = createTRPCReact<AppRouter>();
export default trpc;
