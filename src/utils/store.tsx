import { createStore } from 'solid-js/store';

export const [store, setStore] = createStore({
  user: {},
  manifests: [],
  credentials: {},
  applications: [],
  definitions: [],
  submissions: {},
});

export const updateStore = (store, value) => {
    setStore((prevVal) => {
        return {
            ...prevVal,
            [store]: value
        }
    })
}