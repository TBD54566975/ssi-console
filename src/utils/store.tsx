import { createStore } from 'solid-js/store';

export const [store] = createStore({
  user: {},
  manifests: [],
  credentials: [],
  applications: [],
  definitions: [],
  submissions: [],
});