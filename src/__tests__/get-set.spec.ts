import { get, set } from "../internals"

describe("get, set", () => {
    it("get works", () => {
        expect(get("foo", [])).toBe("foo")
        expect(get({ a: { b: { c: "d" } } }, ["a", "b", "c"])).toBe("d")
    })

    it("set works", () => {
        expect(set("foo", [], "baz")).toBe("baz")
        expect(set(
            { a: { b: { c: "d" } } },
            ["a", "b", "c"],
            "e"
        )).toStrictEqual({ a: { b: { c: "e" } } })
    })
})