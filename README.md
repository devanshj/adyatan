# adyatan

If I tell you the getter of my lens is `x => [x.a, x.b]` and ask you what would the setter be? You would say `y => ({ a: y[0], b: y[1] })`. The point being in some cases the setter can be derived from the getter, but we still explicitly write our setters. Adyatan (hindi for "update") fixes that...

```javascript
import setter from "adyatan";

let setNameAge = setter(user => [user.name, user.age])
setName(["Devansh", 20], {}) // { name: "Devansh", age: 20 }
```

Now obviously it works only for cases where you're just changing the structure ie no "logic" involved. Also it's meant to be a toy, YOLO if you want to use it anyways.
