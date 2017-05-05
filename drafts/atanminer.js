require ('../dlib/mutil.js')
Fdrandom=require ('../dlib/Fdrandom.js')
TRG=require('../trigfills.js')

Fdrandom=Fdrandom.hot()

var tau=Math.PI*2   ,pi=Math.PI 
   ,hpi=Math.PI*0.5 ,qpi=Math.PI*0.25 ,epi=Math.PI*0.125 
   ,sq3=1.7320508075688772 //sqrt(3)

function modp(a,b){
  return a-Math.floor(a/b)*b //removes neg
}


//tweaked factors give atan some extra accuracy

function atan(x,ff3,ff5,ff7,ff9,ff11){
  
  var pos=1, mut=0, mut2=0
  
  if(x<0){ pos=0,x=0-x }
  if(x>1){ x=1/x , mut=1  }

  if(x>0.26794919){
    x=(sq3*x-1)/(sq3+x) 
    mut2=1;
  }

  var x2=x*x ,x4=x2*x2 ,x8=x4*x4

  x=x- x*x2*ff3 +x4*x*ff5 -x4*x2*x*ff7 +x8*x*ff9 -x8*x2*x*ff11

  if(mut2){ x+= hpi*f3 }
  if(mut) { x = hpi-x  }
 
  if(pos) return x
  return -0-x
}


function atanw(x){
  
  var pos=1, mut=0, mut2=0
  
  if(x<0){ pos=0,x=0-x }
  if(x>1){ x=1/x , mut=1  }

  if(x>0.26794919){
    x=(sq3*x-1)/(sq3+x) 
    mut2=1;
  }

  var x2=x*x ,x4=x2*x2 ,x8=x4*x4

  x=x- x*x2/3 +x4*x/5 -x4*x2*x/7 +x8*x/9 -x8*x2*x/11 +x8*x4*x/13-x8*x4*x*x2/15+x8*x8*x/17-x8*x8*x*x2/19

  if(mut2){ x+= hpi*f3  }
  if(mut) {x = hpi-x }
 
  if(pos) return x
  return -x
}

//~ x - 1/3 x^3 + 1/5 x^5 - 1/7 x^7 + 1/9 x^9 - 1/11 x^11 + 1/13 x^13 - 1/15 x^15 + 1/17 x^17 - 1/19 x^19 + 1/21 x^21 - 1/23 x^23 + 1/25 x^25 - 1/27 x^27 + 1/29 x^29 - 1/31 x^31 + 1/33 x^33 - 1/35 x^35


function funcomp(fna,fnb,s,e,d){

  var tt=0, mx=0 , ttv=0, mxv=0//, cntt=0, 
     ,st=(e-s)*0.9999999999/(d-1) 
  for(var i=s;i<=e;i=i+st){ 
    var x=fna(i),y=fnb(i)
    //~ console.log(i.toPrecision(2),x,y,x-y)
    var uu=Math.abs(x-y)
    tt+=(x-y)*(x-y)
    if(uu>mx) mx=uu

    var uv, ax=Math.abs(x),ay=Math.abs(y)
    uv=Math.abs(x-y)/(ax+ay+0.0001)
    ttv+=(uv)*(uv)
    if(uv>mxv) mxv=uv

    //~ cnt++
  }
  //~ console.log("tot",tt)
  //~ console.log("mx",mx)
  return {t:tt,m:mx,tv:ttv,mv:mxv}
}


var tal=100000000000, max=tal, talv=tal, maxv=max,ocount=0

///1- x2*ff2 + x4*f24 - x2*x4*f720 + x4*x4*f40k
///costay  f2=1/2, f24=1/24,f720=1/720,f40k=1/40580 
var dz=[100000000000, 10000000, 100000, 10000, 1000]
var tz=[300000000000, 50000000, 700000, 90000,11000]
var tz=[299999999180, 50000090, 700010, 90010,11770]

/*
finals for:
299999999497,500001,7001,8988,10960
abs pres 2.797721373020903e-18 3.110341428858021e-10
rel pres 1.3736299797925403e-17 6.680824194513865e-10
abs impv 4.9880406991317673e-17 2.3468899046363845e-9
rel impv 1.9209020330666428e-16 4.407209347755503e-9

finals for:
29999999908,5000048,70021,8983,10854
abs pres 7.857765678061745e-19 2.087385819748988e-10
rel pres 5.0643991460008675e-18 3.9858520510724077e-10
abs impv 5.1892351796532406e-17 2.4491854655472878e-9
rel impv 2.007621039585888e-16 4.676706562099649e-9

finals for:
30000000026,5000000,69983,8928,1092
abs pres 1.3564259622350411e-17 1.331409538174455e-9
rel pres 5.433287258044456e-17 2.542319392858836e-9
abs impv 3.911386874198817e-17 1.3265145093477315e-9
rel impv 1.5149363052414513e-16 2.532972374348054e-9

finals for:
29999999918,5000009,70001,9001,1177
abs pres 9.527719480092843e-20 4.3549774897400084e-11
rel pres 6.771670028603219e-19 1.1571264252138234e-10
abs impv 5.258285116953765e-17 2.6143742726247865e-9
rel impv 2.0514933610172936e-16 4.959579124685507e-9

finals for:
299999999177,50000082,700011,90019,11768
abs pres 7.307093983568608e-20 7.33657579132796e-11
rel pres 5.229193774078481e-19 1.400915220439228e-10
abs impv 2.2206254965242346e-20 -2.981598301587951e-11
rel impv 1.5424762545247381e-19 -2.4378879522540452e-11

*/


var fcomp=funcomp
var tsn
tsn=10000000
tsn=500000
//~ tsn=20000000
//~ tsn=10000
//~ tsn=1
var mage=30
/*


*/

var fz=[]; fz[0]=tz[0],fz[1]=tz[1],fz[2]=tz[2],fz[3]=tz[3],fz[4]=tz[4]

//~ var df=[0,0,0,0,1,-1,3,-3,9,-9,30,-30] 
var df=[0,0,0,0,-1,1,-2,2]
var mulla=2,mope=0
var zzsteps=187
var alph=1, alp={}

while(tsn--){
  
  //~ var ofs=Fdrandom.f48()*0.5
  
  var sc = fcomp(
   function(x){ return atanw(x) }
  ,function(x){ 
    return atan(x 
     ,dz[0]/tz[0] 
     ,dz[1]/tz[1]
     ,dz[2]/tz[2] 
     ,dz[3]/tz[3]
     ,dz[4]/tz[4]
     ) 
  }
,0, 0.26794919, zzsteps
  )
  
  //~ console.log(sc)
  if(alph){ alp.t=sc.t, alp.m=sc.m, alp.mv=sc.mv, alp.tv=sc.tv, alph=0 }
  
  //~ console.log(sc)
  
  if((sc.t<=tal&&sc.m<=max&&sc.tv<=talv&&sc.mv<=maxv)
    &&(sc.t<tal||sc.m<max||sc.tv<talv||sc.mv<maxv)
    ){
    
    tal=sc.t, max=sc.m,talv=sc.tv, maxv=sc.mv,
    
    fz[0]=tz[0]
    fz[1]=tz[1]
    fz[2]=tz[2]
    fz[3]=tz[3]
    fz[4]=tz[4]
    
    //~ if(ocount++%1000===1)
    {
      console.log(fz.join(" "))
      console.log("scored:",tal,max)
    }
    //~ mulla*=1.1
  }
  
  //make test set
  do{
    Fdrandom.mixup(df)
    mulla=Fdrandom.f48()*mage+0.5
    
    tz[0] = fz[0]+Math.floor(df[0] *mulla)    //*mulla
    tz[1] = fz[1]+Math.floor(df[1] *mulla)    //*mulla
    tz[2] = fz[2]+Math.floor(df[2] *mulla)
    tz[3] = fz[3]+Math.floor(df[3] *mulla)
    tz[4] = fz[4]+Math.floor(df[4] *mulla)
  }while((tz[0]!=fz[0])&&(tz[1]!=fz[1])&&(tz[2]!=fz[2])&&(tz[3]!=fz[3])&&(tz[4]!=fz[4]))
  
}

console.log("finals for:")

sc = funcomp(
 function(x){ return atanw(x) }
,function(x){ 
  return atan(x 
   ,dz[0]/fz[0] 
   ,dz[1]/fz[1]
   ,dz[2]/fz[2] 
   ,dz[3]/fz[3]
   ,dz[4]/tz[4]
   ) 
}
,0, 0.26794919, zzsteps
)

console.log(fz.join(","))

console.log("abs pres",sc.t,sc.m)
console.log("rel pres",sc.tv,sc.mv)

console.log("abs impv",alp.t-sc.t,alp.m-sc.m)
console.log("rel impv",alp.tv-sc.tv,alp.mv-sc.mv)

//~ console.log(costay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3]))
//~ console.log(Math.cos(0.78539811350441),costay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3])-Math.cos(0.78539811350441))
    