import { defineStore } from "pinia"

export const useStoreError = defineStore('error', {
  state: () => ({
    code: null,
  }),

  actions: {
    setCode(code) {
      this.code = code
    }
  },
})