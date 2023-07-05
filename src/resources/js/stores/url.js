import { defineStore } from "pinia"

export const useStoreUrl = defineStore('url', {
  state: () => ({
    path: "answer/recent",
    pathInitial: "anwser",
  }),

  actions: {
    setPath(path) {
      this.path = path
    },
    setPathInitial(path) {
      this.pathInitial = path
    },
  },
})