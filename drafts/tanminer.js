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


function tan(x,f3,f15,f315,f2k,f155k){

  var inv=1 ,mut=0 ,mut2=0
  x=modp(x,pi)

  if(x>hpi){ inv=-1 ,x=pi-x }
  if(x>qpi){ mut=1 ,x=hpi-x }
  if(x>epi){ mut2=2, x=x*0.5 } 
  
  var c=x*x*x, cc=c*c  //funky maclaurin series
                
  x=  x  +c*f3  +c*x*x*f15  +cc*x*f315  +cc*c*f2k  +cc*c*x*x*f155k
    
  if(mut2){ x= 2*x/(1-x*x) }
  if(mut){ x=1/x           }

  return inv*x
}


//tweaked factors give atan some extra accuracy
var ff3 =100000000000/300000000002
   ,ff5 =100000/500002
   ,ff7 =1000/7001 ,ff9 =1000/8995 ,ff11=1000/1102
                    
function atan(x){
  
  var pos=1, mut=0, mut2=0
  
  if(x<0){ pos=0,x=0-x }
  if(x>1){ x=1/x , mut=1  }

  if(x>0.26794919){
    x=(sq3*x-1)/(sq3+x) 
    mut2=1;
  }

  var x2=x*x ,x4=x2*x2 ,x8=x4*x4

  x=x- x*x2*ff3 +x4*x*ff5 -x4*x2*x*ff7 +x8*x*ff9 -x8*x2*x*ff11

  if(mut2){ x+= hpi*f3  }
  if(mut) {x = hpi-x }
 
  if(pos) return x
  return -x
}

//~ var f3=1/3,f6=1/6,f120=1/120,f5k=1/5040,f362k=1/364840  //362880 
function sintay(x,f6,f120,f5k,f362k){ //taylor series calculation, last fac is tweaked

  //if(x>qpi){ return costay(hpi-x) }
  var c=x*x*x
  return x-(c*f6)+(c*x*x*f120)-(c*c*x*f5k)+(c*c*c*f362k) 
  
}

//~ var f24=1/24,f720=1/720,f40k=1/40580   //orig: 40320
function costay(x,f2,f24,f720,f40k){
  
  //if(x>qpi){ return sintay(hpi-x) }
  var x2=x*x,x4=x2*x2
  return 1- x2*f2 + x4*f24 - x2*x4*f720 + x4*x4*f40k 
  
}





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

///tan
//~ var f15=2/15,f315=17/315,f2k=62/2835,f155k=1382/146555
//~ var fg3=1000000000/2999999887,f15=200000000/1500000678
   //~ ,f315=170000/3150457,f2k=6200/282874,f155k=1382/146286

// 5.055947837602811e-16 7.50332374011009e-9
//~ var dz=[1,2,17,62,1382] 
//~ var tz=[3,15,315,2835,146555]
//3.9470683287115024e-17 1.5836425504289764e-9
//3.971392736648054e-17 1.5704270106553508e-9
//~ var dz=[1000000000, 200000000, 170000,  6200,  1382]
//~ var tz=[2999999887,1500000678,3150457,282874,146286]

//~ var tz=[2999999805,1500001014,3150540,282808,145914]
//~ var tz=[2999999850,1500000800,3150500,282840,146100]
//~ 100000000/299999985,2000000/15000008,1700/31505,620/28284,1382/146100
//3000000124,1500000729,3150180,283141,146537

///1- x2*ff2 + x4*f24 - x2*x4*f720 + x4*x4*f40k
///costay  f2=1/2, f24=1/24,f720=1/720,f40k=1/40580 
var dz=[10000000000, 100000,   100000,    1000]
var tz=[20000000010, 239999910-100, 71998270,40578790]
var tz=[20000000000,2399999,71998126,40578812]
var tz=[20000000000,2399999,71998376,40578583]
      //  1/2,100000/2399999,100000/71998376,1000/40578583
/*
legacy:
finals for:

200,240,7200,40580000,
abs pres 7.246625313592071e-17 1.4897552080839205e-9
rel pres 2.9383274255551413e-17 1.0533415261528431e-9
1.4897513223033343e-9

finals for:
2000000007,23999991,7199827,4057879,
abs pres 2.4334023490511745e-17 7.879636942931256e-10
rel pres 8.806865517577526e-18 5.571350757545712e-10
7.879612518024715e-10

finals for:
20000000016,239999898,71998276,40578748,
abs pres 2.0624367763888523e-17 8.348285396309052e-10
rel pres 8.226373313558661e-18 5.506516018917415e-10
7.7879136473058e-10

20000000054,239999909,71998299,40578763,
abs pres 2.315379667887314e-17 7.844245253352256e-10
rel pres 8.734347892618555e-18 5.239051625441174e-10
7.409636237909467e-10

19999999995,239999883,71998126,40578812,
abs pres 1.8846617708752458e-17 8.107998716866405e-10
rel pres 7.576131986047034e-18 5.38094262324116e-10
7.610314600725587e-10

finals for:
20000000000,2399999,71998376,40578583,
abs pres 2.0842816822218446e-17 8.754214020356699e-10
rel pres 8.563217431445711e-18 6.131807442695738e-10
8.672270679355165e-10

legacy:
finals for:

200,240,7200,40580000,
abs pres 7.246625313592071e-17 1.4897552080839205e-9
rel pres 2.9383274255551413e-17 1.0533415261528431e-9
1.4897513223033343e-9

*/


var fcomp=funcomp
//~ fcomp=funcompx
//~ tsn=300000
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
var df=[0,0,0,-1,1,-2,2]
var mulla=2,mope=0
var zzsteps=187
var alph=1, alp={}

while(tsn--){
  
  //~ var ofs=Fdrandom.f48()*0.5
  
  var sc = fcomp(
   function(x){ return Math.cos(x) }
  ,function(x){ 
    return costay(x 
     ,dz[0]/tz[0] 
     ,dz[1]/tz[1]
     ,dz[2]/tz[2] 
     ,dz[3]/tz[3]
     //~ ,dz[4]/tz[4]
     ) 
  }
,0.0000000001, qpi-0.0000000001, zzsteps
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
    //~ fz[4]=tz[4]
    
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
    
    //~ tz[0] = fz[0]+Math.floor(df[0] *mulla)    //*mulla
    //~ tz[1] = fz[1]+Math.floor(df[1] *mulla)    //*mulla
    tz[2] = fz[2]+Math.floor(df[2] *mulla)
    tz[3] = fz[3]+Math.floor(df[3] *mulla)
  }while((tz[0]!=fz[0])&&(tz[1]!=fz[1])&&(tz[2]!=fz[2])&&(tz[3]!=fz[3]))
  //~ tz[4] = fz[4]+Math.floor(df[4] *mulla)
  
}

console.log("finals for:")

sc = funcomp(
 function(x){ return Math.cos(x) }
,function(x){ 
  return costay(x 
   ,dz[0]/fz[0] 
   ,dz[1]/fz[1]
   ,dz[2]/fz[2] 
   ,dz[3]/fz[3]
   //~ ,dz[4]/tz[4]
   ) 
}
,0.0000000001, qpi-0.0000000001, zzsteps
)

console.log(fz.join(","))

console.log("abs pres",sc.t,sc.m)
console.log("rel pres",sc.tv,sc.mv)

console.log("abs impv",alp.t-sc.t,alp.m-sc.m)
console.log("rel impv",alp.tv-sc.tv,alp.mv-sc.mv)

console.log(costay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3]))
console.log(Math.cos(0.78539811350441),costay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3])-Math.cos(0.78539811350441))
    