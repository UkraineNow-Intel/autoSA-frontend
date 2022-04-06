import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";
import namedPermissions from '@/stores/config/permissions' 

export const useAuth = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            username: '',
            permissions: {},
        }
    },
    getters: {
        hasPermission: (state) => {
            return (...args) => {
                if (args.length == 1){
                    if (!(args[0] in namedPermissions)) {
                        console.log("Named permission not defined - misspelled?")
                        return false
                    }
                    args = namedPermissions[args[0]]
                }
                return (args[0] in state.permissions && args[1] in state.permissions[args[0]] && state.permissions[args[0]][args[1]].includes(args[2])) 
            }
        }
    },
    actions: {
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
                this.username = ''
                this.isLoggedIn = false
                this.permissions = {}
                return { 'success': false }
            }
        },
        async logout() {
            try {
                await AutoSaApi.logout()
                this.username = ''
                this.isLoggedIn = false
                this.permissions = {}
                return { 'success': true }
            } catch (e) {
                return { 'success': false }
            }
        },
    },
})