import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest has no globals by default, so Testing Library's automatic cleanup never registers.
afterEach(cleanup);
