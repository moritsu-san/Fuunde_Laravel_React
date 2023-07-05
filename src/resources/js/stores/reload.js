import { defineStore } from "pinia"

export const useStoreReload = defineStore('reload', {
    state: () => ({
        status: false,
    }),

    actions: {
        setStatus(status) {
            this.status = status
        }
    },
})