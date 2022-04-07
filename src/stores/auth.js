import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";
import { useSource } from './sources'

export const useAuth = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            username: '',
            permissions: [],
        }
    },
    getters: {
        hasPermission: (state) => {
            return (permissionName) => {
                return state.permissions.filter((x) => (x.codename == permissionName)).length > 0
            }
        }
    },
    actions: {
        clearStore() {
            this.isLoggedIn = false
            this.username = ''
            this.permissions = []
        },
        async login(username, password) {
            try {
                let e = await AutoSaApi.login(username, password).then((e) => { return e })
                this.username = e.data.username
                this.isLoggedIn = true
                this.permissions = e.data.permissions
                return { 'success': true }
            } catch (e) {
                return { 'success': false, 'detail': e.response.data.detail }
            }
        },
        async update() {
            try {
                let e = await AutoSaApi.whoami().then((e) => { return e })
                this.username = e.data.username
                this.isLoggedIn = true
                this.permissions = e.data.permissions
                return { 'success': true }
            } catch (e) {
                this.clearStore()
                return { 'success': false }
            }
        },
        async logout() {
            try {
                await AutoSaApi.logout()
                this.clearStore()
                const sourceStore = useSource()
                sourceStore.clearStore()
                return { 'success': true }
            } catch (e) {
                return { 'success': false }
            }
        },
    },
})