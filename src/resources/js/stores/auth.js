import { defineStore } from "pinia"
import axios from 'axios'
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'
import { toHandlerKey } from "vue"
import { useStoreError } from './error'

export const useStoreAuth = defineStore('auth', {
  state: () => ({
    user: null,
    apiStatus: null,
    loginErrorMessages: {},
    registerErrorMessages: {},
  }),

  getters: {
    check: state => !!state.user,
    username: state => state.user ? state.user.name : '',
    useremail: state => state.user ? state.user.email : '',
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    setApiStatus (status) {
      this.apiStatus = status
    },

    async register (data) {
      const {setCode} = useStoreError()
      this.setApiStatus(null)
      try {
        const res = await axios.post('/api/register', data)
        if(res.status === CREATED) {
          this.setApiStatus(true)
          this.setUser(res.data)
        }
      } catch(error) {
        this.setApiStatus(false)
        if(error.response.status === UNPROCESSABLE_ENTITY) {
          this.setRegisterErrorMessages(error.response.data.errors)
        } else {
          setCode(error.response.status)
        }
      }
    },

    async login (data) {
      const {setCode} = useStoreError()
      this.setApiStatus(null)
      try {
        const res = await axios.post('/api/login', data)
        if (res.status === OK) {
          this.setApiStatus(true)
          this.setUser(res.data)
        }
      } catch (error) {
        this.setApiStatus(false)
        if(error.response.status === UNPROCESSABLE_ENTITY) {
          this.setLoginErrorMessages(error.response.data.errors)
        } else {
          setCode(error.response.status)
        }
      }
    },

    async logout () {
      const {setCode} = useStoreError()
      this.setApiStatus(null)
      try {
        const res = await axios.post('api/logout')
        if (res.status === OK) {
          this.setApiStatus(true)
          this.setUser(null)
          return false
        }
      } catch (error) {
        this.setApiStatus(false)
        setCode(error.response.status)
      }
    },

    async currentUser () {
      const {setCode} = useStoreError()
      this.setApiStatus(null)
      try {
        const res = await axios.get('api/user')
        const user = res.data || null
        if (res.status === OK) {
          this.setApiStatus(true)
          this.setUser(user)
        }
      } catch (error) {
        this.setApiStatus(false)
        setCode(error.response.status)
      }
    },

    setRegisterErrorMessages (messages) {
      this.registerErrorMessages = messages
    },

    setLoginErrorMessages (messages) {
      this.loginErrorMessages = messages
    },
  },
})