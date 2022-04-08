import { createPinia } from 'pinia'
import { useSource } from './sources.js'
import { test, describe, expect} from 'vitest';


describe('Sources Store', () => {
  const sourceStore = useSource(createPinia())

  test('Getting sources', async () => {
    expect(sourceStore.sources).eql([])
    await sourceStore.getSourcesFromApi()
    expect(sourceStore.sources).toHaveLength(6)
    expect(sourceStore.sourceIdDict[11]).eql(2)

  })

  test('Getting sources with tags', async () => {
    const route1 = sourceStore.getSourcesWithTags(["route-1"])
    const route2 = sourceStore.getSourcesWithTags(["route-2"])
    expect(route1).toHaveLength(2)
    expect(route2).toHaveLength(3)
  })

  test('Getting pinned sources', async () => {
    const pinned = sourceStore.getPinnedSources()
    expect(pinned).toHaveLength(4)
  })

  test('Deleting sources', async () => {
    await sourceStore.deleteSource(9)
    expect(sourceStore.sources).toHaveLength(5) 
    expect(sourceStore.sourceIdDict[11]).eql(1)

  })
})
