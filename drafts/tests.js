if(typeof window ==='undefined'){
require ('../dlib/mutil.js')
Fdrandom=require ('../dlib/Fdrandom.js')
TRG=require('../trigfills.js')
}else{ TRG=trigfills }


var pi=Math.PI

//note a few problems with math.tan on node/chrome
//~ console.log(Math.tan(0),TRG.tan(0))
//~ console.log(Math.tan(1),TRG.tan(1))
//~ console.log(Math.tan(-1),TRG.tan(-1))
//~ console.log(Math.tan(pi),TRG.tan(pi)) //math does not return 0!
//~ console.log(Math.tan(pi/2),TRG.tan(pi/2)) //math does not return 0!

//~ console.log(Math.sin(pi),TRG.sin(pi)) //math does not return 0!
//~ console.log(Math.sin(-pi),TRG.sin(-pi)) //math does not return 0!
//~ return
//~ console.log(Math.tan(pi*0.999),TRG.tan(pi*0.999))
//~ console.log(Math.tan(pi*1.001),TRG.tan(pi*1.001))
//~ console.log(Math.tan(pi*1.501),TRG.tan(pi*1.501))
//~ console.log(Math.tan(pi*2.501),TRG.tan(pi*2.501))
//~ console.log(Math.tan(pi*3.501),TRG.tan(pi*3.501))
//~ console.log(Math.tan(pi*0.501),TRG.tan(pi*0.501))
//~ console.log(Math.tan(pi*0.50),TRG.tan(pi*0.5))
//~ console.log(Math.tan(pi*0.50),TRG.tan(pi*0.500000001))
//~ console.log(Math.tan(pi*0.50),TRG.tan(pi*0.49999999))
//~ console.log(Math.tan(22/7) , TRG.tan(22/7))
//~ console.log(Math.tan(13/7) , TRG.tan(13/7))
//~ console.log(Math.tan(5/7) , TRG.tan(5/7))
// tan 13/7    math  this  vs  wolfram
// -3.396297401513 6993    -3.396297 398306354
// -3.396297401513 7002    -3.396297 401513700234145
// tan 22/7
//0.001264489941294 5707    0.0012644899412946 932
//0.001264489941294 6341    0.0012644899412946 341
//tan 5/7
//0.86700821851070 31    0.8670082 216074371
//0.86700821851070 2987  0.8670082 185107029875044

//~ return

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

function findmaxd(fna,fnb,s,e,d){
  var tt=0, mx=0, mv=0, cnt=0
  for(var j=0;j<d;j++){
    var i=Fdrandom.range(s,e)
    var x=fna(i),y=fnb(i)
    var uu=Math.abs(x-y)
    if(uu>mx){ mx=uu, mv=i }
  }
  console.log("rootsumsq diff:",Math.sqrt(tt/cnt))
  console.log("max diff is:",mx,"for",mv)
  console.log()
  //~ console.log("mv",mv)
}

//~ findmaxd(Math.tan,TRG.tan,1.56,1.58,1000000)
//~ return
//~ console.log(TRG.sin(2.356194540085384))
//~ console.log(Math.sin(2.356194540085384))
//~ findmaxd(Math.tan,TRG.tan,-2.1*Math.PI,2.1*Math.PI,1000000)
//~ return
//~ console.log(Math.tan(4.712388915588255)) //15432947.799522597
//~ console.log(TRG.tan(4.712388915588255))  //15432947.843274795
//~ return
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
//~ function modne(x){ return TRG.modne(x,1.5) }
function modulus(x){ return x%1.5 }

console.log("relative speed")


function ofun(fn,s,e){
  var r=2, z=(e-s)/100
  for(var i=s;i<e;i+=z)
  { r+=fn(i) }	
  return r
}
//~ return
bench( function(){ return ofun(Math.sqrt,0,20)} , 1, "warmup w/ sqrt", 0)

var epz=0.99999999
var tfuns=[
  Math.sin, TRG.sin,  -Math.PI*epz, Math.PI*epz
 ,Math.cos, TRG.cos,  -Math.PI*epz, Math.PI*epz
 ,Math.tan, TRG.tan,  -Math.PI*epz, Math.PI*epz
 ,Math.acos,TRG.acos, -epz, epz
 ,Math.asin,TRG.asin, -epz ,epz
 ,Math.atan,TRG.atan, -Math.PI*epz, Math.PI*epz
 //~ ,modulus,modp, -3, 4
 //~ ,modulus,modn, -3, 4 
 //~ ,modulus,modne, -3, 4 
 ]
 
for( var c=0;c<tfuns.length; ){

var fna=tfuns[c++],fnb=tfuns[c++],s=tfuns[c++],e=tfuns[c++]

bench( function(){ return ofun(fna,s,e)} , 1, "Math."+fna.name, 0)
bench( function(){ return ofun(fnb,s,e)} , 1, "this."+fnb.name, 0)
bench( function(){ return ofun(fna,s,e)} , 1, "Math."+fna.name, 0)
bench( function(){ return ofun(fnb,s,e)} , 1, "this."+fnb.name, 0)
console.log()
}

console.log()
bench( function(){ return ofun(Math.sqrt,0,20)} , 2, "fin w/ sqrt", 0)

//~ return

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
