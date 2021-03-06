import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { sourceData, newSourceData, sourceDataDeleted } from "./mockdata"


function addBackendFieldsToSource(sourceObject){
    sourceObject["id"] = 15
    sourceObject["locations"] = []
    sourceObject["tags"] = []
    return sourceObject
}

export const restHandlers = [
    rest.get('http://localhost/api/sources', (req, res, ctx) => {
        if (req.url.searchParams.get("deleted") == null){
            return res(ctx.status(200), ctx.json(sourceData))
        } else if (req.url.searchParams.get("deleted")) {
            return res(ctx.status(200), ctx.json(sourceDataDeleted))
        } else {
            console.log("Error! No data for this in mockdata yet")
        }
    }),
    rest.post('http://localhost/api/sources', (req, res, ctx) => {
        const sourceObject = addBackendFieldsToSource(req.body)
        return res(ctx.status(200), ctx.json(sourceObject))
    }),
    rest.patch('http://localhost/api/sources/15', (req, res, ctx) => {
        let data = addBackendFieldsToSource(newSourceData)
        for (const [key, value] of Object.entries(req.body)) {
            data[key] = value
        }
        return res(ctx.status(200), ctx.json(data))
    }),
    rest.delete('http://localhost/api/sources/:id', (req, res, ctx) => {
        return res(ctx.status(200))
    }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => {
    return server.listen({ onUnhandledRequest: 'error' })
})

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
