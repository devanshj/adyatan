import { TRACEABLE, $$path } from "../internals"

describe("traceable", () => {
    it("works", () => {
        expect(TRACEABLE.foo[0][$$path]).toStrictEqual(["foo", 0])

        let $$baz = Symbol("baz")
        expect(TRACEABLE.foo.bar[0][1][$$baz][$$path]).toStrictEqual(["foo", "bar", 0, 1, $$baz])

        expect(TRACEABLE[$$path]).toStrictEqual([])
    })
})