> 在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

```
function add(a, b) {
    return a + b;
}

// 执行add函数，一次传入两个参数即可
add(1, 2) // 3

var addCurry = curry(add);
addCurry(1)(2) // 3
```
