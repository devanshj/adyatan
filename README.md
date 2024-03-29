# adyatan

If I tell you the getter of my lens is `user => user.age` and ask you what would the setter (without any guards or logic) be? You would say `(age, user) => ({ ...user, age })`. The point being in some cases the setter can be derived from the getter, but we still explicitly write our setters. Adyatan (hindi for "update") gives an alternative...

```javascript
import setter from "adyatan";

const getNameAge = user => [user.name, user.age];
const setNameAge = setter(getNameAge);
// equivalent to
// const setNameAge = ([name, age], user) => ({ ...user, name, age })

setNameAge(["Devansh", 20], {})
// { name: "Devansh", age: 20 }
```

You'd usually pair it with some lens library, eg...

```javascript
import { useProfunctorState as _useProfunctorState } from "@staltz/use-profunctor-state"
import setter from "adyatan";

const useProfunctorState = (...a) => {
  let s = _useProfunctorState(...a)
  return ({
    map: get => s.promap(get, setter(get)),
    promap: (...a) => s.promap(...a)
  })
}

// Without adyatan
_useProfunctorState({ a: 0 }).promap(x => x.a, (a, x) => ({ ...x, a }))

// With adyatan
useProfunctorState({ a: 0 }).map(x => x.a)
```

Now obviously it works only for cases where you're just changing the structure ie no "logic" involved. Also it's meant to be a toy, YOLO if you want to use it anyways.
