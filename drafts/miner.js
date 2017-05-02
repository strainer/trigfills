require ('../dlib/mutil.js')
Fdrandom=require ('../dlib/Fdrandom.js')
TRG=require('../trigfills.js')




function funcomp2(fna,fnb,s,e,d){
  var tt=0, mx=0
  for(var i=s;i<e;i=i+d){
    var x=fna(i),y=fnb(i)
    //~ console.log(i.toPrecision(2),x,y,x-y)
    var uu=Math.abs(x-y)
    tt+=(x-y)*(x-y)
    if(uu>mx) mx=uu
  }
  console.log("tot",tt)
  console.log("mx",mx)
}



//~ console.log("\n acos")
//~ funcomp(Math.acos,TRG.acos,-1.1,1.1,0.2)

//~ console.log("\n asin")
//~ funcomp(Math.asin,TRG.asin,-1.1,1.1,0.2)

console.log(atan(0.51))
console.log(TRG.atan(0.51))

console.log("\n atan")
funcomp2(Math.atan,atan,-Math.PI*0.999, Math.PI*0.999, 0.01)

//~ return






  var sq3=Math.sqrt(3), hpi=Math.PI/2
  //~ console.log(Math.sqrt(3))
  function atan(x,f3,f5,f7,f9,f11){

    var inv=1, mut=0, mut2=0
    
    if(x<0){ inv=-1,x=0-x }

    if(x>1){ x=1/x , mut=1  }

    if(x>0.26794919){
      x=(sq3*x-1)/(sq3+x) 
      mut2=1;
    }

    var x2=x*x, x4=x2*x2,x8=x4*x4

    x=x- x*x2*f3 + x4*x*f5 - x4*x2*x*f7 + x8*x*f9 - x8*x2*x*f11

    if(mut2){ x+= hpi*f3  }
    if(mut){x = hpi-x }
   
    return inv*x
  }                            //rough tweak to atan fac didnt help 


       //tcare no collisions of these vars


function funcomp(fna,fnb,s,e,d){

  var tt=0, mx=0//, cntt=0, 
  for(var i=s;i<e;i=i+d){
    var x=fna(i),y=fnb(i)
    //~ console.log(i.toPrecision(2),x,y,x-y)
    var uu=Math.abs(x-y)
    tt+=(x-y)*(x-y)
    if(uu>mx) mx=uu
    //~ cnt++
  }
  //~ console.log("tot",tt)
  //~ console.log("mx",mx)
  return {t:tt,m:mx}
}

var tsn=1000000, ocount=0
//~ tsn=1
var tal=100000000000,max=100000000000
var dm=1000000000000
//~ var tz=[30000000,50000000,70000000,90000000,110000000]
//~ var fz=[30000000,50000000,70000000,90000000,110000000]
var tz=[3000000000040,5000040300000,7001910800000,8993000000000,11029300000000]
var fz=[3000000000040,5000040300000,7001910800000,8993000000000,11029300000000]
//~ var df=[0,0,0,0,1,-1,3,-3,9,-9,30,-30] 
var df=[0,0,0,-10000,10000,-10000000,10000000,-100000000,100000000]
var mulla=100,mope=0


while(tsn--){
  
  var ofs=Fdrandom.f48()*0.5
  var sc = funcomp(
   function(x){ return Math.atan(x) }
  ,function(x){ return atan(x , dm/tz[0],dm/tz[1],dm/tz[2],dm/tz[3],dm/tz[4])     }
  ,-Math.PI*1.199+ofs, Math.PI*1.199+ofs, 0.09
  )
  //~ console.log(sc)
  if(sc.t<=tal&&sc.m<=max){
    tal=sc.t, max=sc.m
    fz[0]=tz[0]
    fz[1]=tz[1]
    fz[2]=tz[2]
    fz[3]=tz[3]
    fz[4]=tz[4]
    
    //~ if(ocount++%1000===1)
    {
      console.log("improv",tal,max)
      console.log(fz.join(" "))
    }
  }else{
    mope+=(mulla-1)/100
    if(mope>100){ mulla--; mope=0 }
  }
  
  Fdrandom.mixup(df)
  
  tz[0]=fz[0]//+df[0]//*mulla
  tz[1]=fz[1]+Math.floor(df[1]/3)//*mulla
  tz[2]=fz[2]+Math.floor(df[2]/3)
  tz[3]=fz[3]+Math.floor(df[3]/3)
  tz[4]=fz[4]+Math.floor(df[4]/3)
  
}

console.log("finals")
console.log("improv",tal,max)
console.log(fz.join(" "))
    
/* 
  
  mined best facs for atan; 
  3000000000040,5000040300000,7001910800000,8993000000000,11029300000000
  sum2 err: 1.335948484961593e-18 
  max err:2.2681512223954314e-10
  compared to standard:
  8.268302050861639e-17 
  2.594554793233783e-9


*/