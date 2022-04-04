import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";

export const useAuth = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            username: ''
        }
    },
    actions: {
        async login(username, password) {
            try {
                let e = await AutoSaApi.login(username, password).then((e) => { return e })
                this.username = e.data.username
                this.isLoggedIn = true
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
                return { 'success': true }
            } catch (e) {
                this.username = ''
                this.isLoggedIn = false
                return { 'success': false }
            }
        },
        async logout() {
            try {
                await AutoSaApi.logout()
                this.username = ''
                this.isLoggedIn = false
                return { 'success': true }
            } catch (e) {
                return { 'success': false }
            }
        },
    },
})