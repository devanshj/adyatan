import setter from "..";

describe("setter", () => {
    it("basic", () => {
        expect(
            setter((user: any) => [user.name, user.age])
            (["Devansh", 20], {})
        ).toStrictEqual({ name: "Devansh", age: 20 })

        expect(
            setter((foo: any) => [foo.a.b.c, foo.d])
            (["bar", "baz"], { a: { b: { c: "?" } }, d: [1, 2, 3] }))
        .toStrictEqual({ a: { b: { c: "bar" } }, d: "baz" })

        expect(
            setter((user: any) => ({ a: { b: user.name } }))
            ({ a: { b: "Dev" }}, { name: "foo" })
        ).toStrictEqual({ name: "Dev" })
    })

    it("ignores redundant stuff", () => {
        expect(setter((user: any) => [user.name, user.age, { bar: "baz" }])(["Devansh", 20], {}))
        .toStrictEqual({ name: "Devansh", age: 20 })
    })
})