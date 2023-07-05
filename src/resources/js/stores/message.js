import { defineStore } from "pinia"
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

export const useStoreMessage = defineStore('message', {
  state: () => ({
    content: null,
  }),

  getters: {
    
  },

  actions: {
    setMessage(content) {
      this.content = content
    },
  },
})