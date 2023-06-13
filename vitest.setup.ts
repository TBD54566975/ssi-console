import '@testing-library/jest-dom';

global.window = window;

global.fetch = vi.fn(() => Promise.resolve(new Response()));
