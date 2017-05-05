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

///sintay  f6)+(c*x*x*f120)-(c*c*x*f5k)+(c*c*c*f362k) 
///var f6=1/6,f120=1/120,f5k=1/5040,f362k=1/364840  //362880 
var dz=[1000000000,  100000,   1000,    10]
var tz=[6000000000,12000000,5040000,3628800]
var tz=[6000000060,12000000,5039650,3628880]
var tz=[6000000050,12000000,5039680,3628880]
//~ var tz=[(5999939+5999872)/2,(1200468+1200179)/2,(50169+50465)/2,(36343794+36287986)/2]
//~ var tz=[5999980,12008,49990,3725300]
//~ var tz=[6000067,12008,48140,3792800]
//~ var tz=[6000067,12008,48140,3815800]
 
/*
legacy:
6000000,12000,50400,362880,
rel pres 1.2120775634600997e-11 0.0000019535833883605206
abs pres 1.2120775634600997e-11 0.0000019535833883605206

finals for:
600000006,12000,503965,362888,
abs pres 5.529476513638039e-19 1.12773956839618e-10
rel pres 6.685436110560587e-19 1.2070854081385238e-10
0.7071067459175165
0.707106745906841 '   ' 1.0675571537888118e-11

finals for:
6000000049,120000,503968,3628880,
abs pres 3.41367765558803e-19 8.568634690675481e-11
rel pres 4.0635741978148263e-19 9.28575773878249e-11
0.7071067459872276
0.707106745906841 '   ' 8.038658627640416e-11
*/


var fcomp=funcomp
//~ fcomp=funcompx
//~ tsn=300000
var tsn
tsn=10000000
tsn=1000000
tsn=20000000
//~ tsn=10000
//~ tsn=0
var mage=1000
/*


*/

var fz=[]; fz[0]=tz[0],fz[1]=tz[1],fz[2]=tz[2],fz[3]=tz[3],fz[4]=tz[4]

//~ var df=[0,0,0,0,1,-1,3,-3,9,-9,30,-30] 
var df=[0,0,0,-1,1,-2,2]
var mulla=2,mope=0
var zzsteps=137

while(tsn--){
  
  //~ var ofs=Fdrandom.f48()*0.5
  
  var sc = fcomp(
   function(x){ return Math.sin(x) }
  ,function(x){ 
    return sintay(x 
     ,dz[0]/tz[0] ,dz[1]/tz[1]
     ,dz[2]/tz[2] 
     ,dz[3]/tz[3]
     //~ ,dz[4]/tz[4]
     ) 
  }
,0.0000000001, qpi-0.0000000001, zzsteps
  )
  
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
      console.log(mulla.toFixed(4),"improved",tal,max)
      console.log(fz.join(" "))
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
 function(x){ return Math.sin(x) }
,function(x){ 
  return sintay(x 
   ,dz[0]/fz[0] 
   ,dz[1]/fz[1]
   ,dz[2]/fz[2] 
   ,dz[3]/fz[3]
   //~ ,dz[4]/tz[4]
   ) 
}
,0.0000001, qpi-0.0000001, zzsteps
)

console.log(fz.join(","))
console.log("abs pres",sc.t,sc.m)
console.log("rel pres",sc.tv,sc.mv)
console.log(sintay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3]))
console.log(Math.sin(0.78539811350441),"   ",sintay(0.78539811350441,dz[0]/fz[0] ,dz[1]/fz[1],dz[2]/fz[2],dz[3]/fz[3])-Math.sin(0.78539811350441))
    