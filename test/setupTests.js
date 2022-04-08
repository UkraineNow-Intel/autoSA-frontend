import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import sourceData from "./mockdata"

export const restHandlers = [
    rest.get('http://localhost/api/sources', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(sourceData))
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
