export const setter = <T, U>(getter: (t: T) => U) => {
	let writes = pipe(
		TRACEABLE as T,
		getter,
		deepEntries
	)

	return (selected: U, destination: T) =>
		writes.reduce(
			(d, [selectedPath, unselectedWrite]) =>
				isObject(unselectedWrite) && hasProperty(unselectedWrite, $$path)
					? set(
						d,
						unselectedWrite[$$path] as PropertyKey[],
						get(selected, selectedPath)
					) as T
					: d ,
			destination
		)
}


export const $$path = Symbol("$$path");
const pathOnGet = (o: { [$$path]?: PropertyKey[] }): any => new Proxy(o, {
	get: (_, p) =>
		p === $$path
			? (o[$$path] || [])
			: pathOnGet({ [$$path]:
				(o[$$path] || [])
				.concat(
					typeof p === "string" && p !== "" && !Number.isNaN(Number(p))
						? Number(p)
						: p
				)
			})
})
export const TRACEABLE = pathOnGet({});

export const deepEntries = <T, P extends Path<any>>(x: T, parentPath?: P): DeepEntries<T, P> =>
	!isObject(x) || hasProperty(x, $$path)
		? [tuple(parentPath || [], x)] :
	(Array.isArray(x)
		? [...x.entries()] as [PropertyKey, unknown][]
		: Object.entries(x)
	).flatMap(
		([k, v]) =>
			deepEntries(v)
			.map(([s, d]) => tuple([...(parentPath || []), k, ...s], d))
	)
type DeepEntries<T, P extends Path<any>> = [PropertyKey[], unknown][]

export const get = <O, P extends Path<O>>(o: O, path: P): Get<O, P> => {
	if (!isObject(o)) return o;
	if (path.length === 0) return o;
	return get((o as any)[path[0]], path.slice(1))
}

export const set = <O, P extends Path<O>, V>(o: O, path: P, value: V): Set<O, P, V> => {
	if (!isObject(o)) return value;
	if (path.length === 0) return value;
	let newValue = set((o as any)[path[0]], path.slice(1), value)
	if (Array.isArray(o)) return setIndex(o, path[0] as number, newValue);
	return { ...o, [path[0]]: newValue }
}

type Path<O> = PropertyKey[]
type Get<O, P extends Path<O>> = unknown;
type Set<O, P extends Path<O>, V> = unknown;


/* utils */

const hasProperty = <O extends object, K extends PropertyKey>(o: O, k: K): o is O & { [k in K]: unknown } =>
	k in o
	
const isObject = (x: unknown): x is object =>
	typeof x === "object" && x !== null

const objectMapValues = <O extends object, U>(o: O, mapper: (v: O[keyof O]) => U): { [k in keyof O]: U } =>
	Object.fromEntries(
		Object.entries(o)
		.map(([k, v]) => [k, mapper(v)])
	) as any;

const tuple = <T extends any[]>(...xs: T) =>
	xs

const setIndex = <T extends any[], I extends number, V>(xs: T, i: I, v: V): T & { [i in I]: V } => {
	let ys = [...xs];
	ys[i] = v;
	return ys as any;
}

type Pipe = {
	<A>(a: A): A
	<A, B>(a: A, ab: (a: A) => B): B
	<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
	<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
}
const pipe: Pipe = (value: any, ...fns: any[]) =>
	fns.reduce((v, fn) => fn(v), value)