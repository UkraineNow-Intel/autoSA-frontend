import { setActivePinia, createPinia } from 'pinia'
import { useSource } from './sources.js'
import { it, describe, expect, beforeEach } from 'vitest';


describe('Sources Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', async () => {
    const sourceStore = useSource()
    expect(sourceStore.sources).eql([])
    await sourceStore.getSourcesFromApi()
    expect(sourceStore.sources).toHaveLength(9)
    expect(sourceStore.sourceIdDict[8]).eql(2)
    await sourceStore.deleteSource(9)
    expect(sourceStore.sources).toHaveLength(8)
    expect(sourceStore.sourceIdDict[8]).eql(1)

  })
})
