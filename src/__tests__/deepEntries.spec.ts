import { deepEntries, $$path } from "../internals"

describe("deepEntries", () => {
    it("works", () => {
        expect(deepEntries({
            a: { [$$path]: ["foo"] },
            sup: "yo",
            b: {
                c: { [$$path]: ["bar"] },
                d: ["lmao", { [$$path]: ["baz"] }]
            }
        })).toStrictEqual([
            [["a"], { [$$path]: ["foo"] }],
            [["sup"], "yo"],
            [["b", "c"], { [$$path]: ["bar"] }],
            [["b", "d", 0], "lmao"],
            [["b", "d", 1], { [$$path]: ["baz"] }],
        ])
    })
})