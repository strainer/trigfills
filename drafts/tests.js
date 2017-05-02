require ('../dlib/mutil.js')
Fdrandom=require ('../dlib/Fdrandom.js')
TRG=require('../trigfills.js')



function funcomp(fna,fnb,s,e,d){
  var tt=0, mx=0, mv=0, cnt=0
  for(var i=s;i<=e;i=i+d){
    var x=fna(i),y=fnb(i)
    console.log(i.toPrecision(2),x,y,x-y)
    var uu=Math.abs(x-y)
    tt+=(x-y)*(x-y)
    if(uu>mx){ mx=uu, mv=i }
    cnt++
  }
  console.log("rootsumsq diff:",Math.sqrt(tt/cnt))
  console.log("max diff:",mx)
  console.log()
  //~ console.log("mv",mv)
}


//~ console.log("\n acos")
//~ funcomp(Math.acos,TRG.acos,-1.1,1.1,0.2)

//~ console.log("\n asin")
//~ funcomp(Math.asin,TRG.asin,-1.1,1.1,0.2)

//~ console.log("\n atan")
//~ funcomp(Math.atan,TRG.atan,-Math.PI*1.099, Math.PI*1.099, 0.001)

//~ return



console.log("Precision tests: Input  Mathres  thisres  difference")
console.log("\n tan")
funcomp(Math.tan,TRG.tan,-0.5,3.5,0.4)


//~ funcomp(Math.atan,TRG.atan,-3.1,3.1,0.5)
//~ funcomp(Math.cos,TRG.cos,-3.2,3.2,0.4)
//~ funcomp(Math.sin,TRG.sin,-3.2,3.2,0.4)
//~ return

console.log("\n sin")
funcomp(Math.sin,TRG.sin,-3.2,3.2,0.4)

console.log("\n cos")
funcomp(Math.cos,TRG.cos,-3.2,3.2,0.4)

console.log("\n acos")
funcomp(Math.acos,TRG.acos,-1.0,1.0,0.2)

console.log("\n asin")
funcomp(Math.asin,TRG.asin,-1.0,1.0,0.2)

console.log("\n atan")
funcomp(Math.atan,TRG.atan,-3.1,3.1,0.5)


//~ console.log(TRG.sin(1)-Math.sin(1))
//~ console.log(TRG.atan(0.1)-Math.atan(0.1))
//~ console.log(castulp(0.33333333333333333,0))
//~ return

//~ console.log(-5%10)
//~ console.log(TRG.modp(-5,10))
//~ console.log(TRG.modn(-5,10))

//~ return
//~ return

function modp(x){ return TRG.modp(x,1.5) }
function modn(x){ return TRG.modn(x,1.5) }
function modulus(x){ return x%1.5 }

console.log("relative speed")


function ofun(fn,s,e){
  var r=2, z=(e-s)/500
  for(var i=s;i<e;i+=z)
  { r+=fn(i) }	
  return r
}

bench( function(){ return ofun(Math.sqrt,0,20)} , 2, "warmup w/ sqrt", 0)

var tfuns=[
  //~ Math.sin, TRG.sin,  -Math.PI, Math.PI
 //~ ,Math.cos, TRG.cos,  -Math.PI, Math.PI
 //~ ,Math.tan, TRG.tan,  -Math.PI, Math.PI
 Math.acos,TRG.acos, -1, 1
 //~ ,Math.asin,TRG.asin, -1 ,1
 //~ Math.atan,TRG.atan, -Math.PI, Math.PI
 //~ ,Math.atan,TRG.atan, -Math.PI, Math.PI
 //~ ,modulus,modp, -3, 4
 //~ ,modulus,modn, -3, 4 
 ]



for( var c=0;c<tfuns.length; ){

var fna=tfuns[c++],fnb=tfuns[c++],s=tfuns[c++],e=tfuns[c++]

bench( function(){ return ofun(fna,s,e)} , 1, "Math."+fna.name, 0)
bench( function(){ return ofun(fnb,s,e)} , 1, "this."+fnb.name, 0)
bench( function(){ return ofun(fna,s,e)} , 1, "Math."+fna.name, 0)
bench( function(){ return ofun(fnb,s,e)} , 1, "this."+fnb.name, 0)

}

console.log()
bench( function(){ return ofun(Math.sqrt,0,20)} , 2, "fin w/ sqrt", 0)



return

//puzzly output, works
function checkmodp(){
  var c="", k=0
  for (var i= -2;i<2;i=i+0.1){
    c+="("+i.toPrecision(2)+",1.0)="+TRG.modp(i,1.0).toPrecision(2)+"  "
    if(k++==4){ c+="\n";k=0 }
  }
  console.log("modp check:")
  console.log(c)
}

//~ checkmodp()
