require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('../dlib/Fdrandom.js')
TRG=require('../trigfills.js')


function round15sigdigit(x){
  return Math.round(x*1e15)/1e15
}

function rounds(x){
  return Math.round(x*100)/100
}

console.log(rounds(0.005))
console.log(0.1+0.2,round15sigdigit(0.1+0.2))

return

console.log(Math.tan(0.1))
console.log(Math.tan(-0.1))
console.log(Math.tan(Infinity))
console.log(Math.tan(-Infinity))

return

console.log(Math.sin(0.001))
console.log(TRG.sin(0.001))

console.log(Math.atan(0.9999))
console.log( TRG.atan(0.9999))

