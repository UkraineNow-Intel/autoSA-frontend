import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { test, describe, expect } from 'vitest';
import { sourceData, whoamiData } from '/test/mockdata.js'
import { useAuth } from '@/stores/auth.js'

import ElementPlus from 'element-plus';
import SourceList from './SourceList.vue'
import Source from './Item/Source.vue'
import { ElButton } from 'element-plus'

// @vitest-environment jsdom

describe('Source List and Source Item components', () => {

    const pinia = createPinia()
    const authStore = useAuth(pinia)

    const mountSettings = {
        global: {
            plugins: [ElementPlus, pinia]
        },
        props: {
            sources: sourceData
        }
    }

    test('Source List renderring without permissions', async () => {
        let wrapper = mount(SourceList, mountSettings)

        expect(wrapper.text()).toContain('This source is important for route 1 and route 2')
        let sourceItems = wrapper.findAllComponents(Source)
        expect(sourceItems).toHaveLength(6) // six items, as defined in mock data
        expect(sourceItems[0].text()).toContain('This source is important for route 1 and route 2')

        let buttons = sourceItems[0].findAllComponents(ElButton)
        expect(buttons).toHaveLength(0) // no buttons, as user has no permissions
    })


    test('Source List renderring with change and delete permissions', async () => {
        authStore.permissions = whoamiData.permissions
        const wrapper = mount(SourceList, mountSettings)
        const sourceItems = wrapper.findAllComponents(Source)
        const buttons = sourceItems[0].findAllComponents(ElButton)
        expect(buttons).toHaveLength(3) // has three buttons: New Tag, Unpin, Delete Item
    })
})
