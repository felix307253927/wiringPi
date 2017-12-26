const M = require('./build/Release/hello.node');

console.log(M);

let ret = M.hello((a,b)=>{
  
  console.log('--->',a,b)
})


console.log(ret)
