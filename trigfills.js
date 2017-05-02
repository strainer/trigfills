//     ~         trigfills - trig function pollyfills        ~      + 
/*           Copyright 2017 by Andrew Strain. No warranty           * 
 *  This program can be redistributed and modified under the terms  * 
 *  of the Apache License Version 2.0 - see LICENSE for details     * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/ 

// These helped alot:
// www.mathonweb.com/help_ebook/html/algorithms.htm
// web.mit.edu/kenta/www/three/taylor.html

var trigfillfactory = function(){ return (function(){ 
  'use strict'

  var tau=Math.PI*2   ,pi=Math.PI 
     ,hpi=Math.PI*0.5 ,qpi=Math.PI*0.25 ,epi=Math.PI*0.125 
     ,sq3=1.7320508075688772 //sqrt(3)
      
  function version(){
    return "beta0" 
  } 
      
  function modp(a,b){
    return a-Math.floor(a/b)*b //removes neg
  }

  function modn(a,b){
    return a-Math.round(a/b)*b //creates neg
  }
  
  function castulp(c,u){ 
    u=u||256
    return c*(u+1)-c*u
  }

  var f3=1/3,f6=1/6,f120=1/120,f5k=1/5040,f362k=1/364840  //362880 
  function sintay(x){ //taylor series calculation, last fac is tweaked
    
    if(x>qpi){ return costay(hpi-x) }
    var c=x*x*x
    return x-(c*f6)+(c*x*x*f120)-(c*c*x*f5k)+(c*c*c*f362k) 
    
  }

  var f24=1/24,f720=1/720,f40k=1/40580   //orig: 40320
  function costay(x){
    
    if(x>qpi){ return sintay(hpi-x) }
    var x2=x*x,x4=x2*x2
    return 1- x2*0.5 + x4*f24 - x2*x4*f720 + x4*x4*f40k 
    
  }

  function sin(x){
    
    x=x-Math.floor(x/tau)*tau
    
    if(x<pi){
      if(x<hpi){ return sintay(x) }
      return sintay(pi-x) 
    }else{
      x-=pi
      if(x<hpi){ return -0-sintay(x) }
      return -0-sintay(pi-x)
    }	
  }

  function cos(x){ return sin(hpi-x) }
  
  //mined tweaked factors give some extra accuracy
               
  var ff3 =100000000000/300000000002
     ,ff5 =100000/500002
     ,ff7 =1000/7001 ,ff9 =1000/8995 ,ff11=1000/1102
                      
  function atan(x){
    
    var inv=1, mut=0, mut2=0
    
    if(x<0){ inv=-1,x=0-x }

    if(x>1){ x=1/x , mut=1  }

    if(x>0.26794919){
      x=(sq3*x-1)/(sq3+x) 
      mut2=1;
    }

    var x2=x*x, x4=x2*x2,x8=x4*x4

    x=x- x*x2*ff3 + x4*x*ff5 - x4*x2*x*ff7 + x8*x*ff9 - x8*x2*x*ff11

    if(mut2){ x+= hpi*f3  }
    if(mut){x = hpi-x }
   
    return inv*x
  }
                                                //155925  ,  145813
  var f15=2/15,f315=17/315,f2k=62/2835,f155k=1382/146555
                              //crude tweak of last fac improved acc by 100s
  function tan(x){

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


  function acos(x){
   if(x==-1) return Math.PI
   return modp(atan( Math.sqrt(1-x*x)/x),Math.PI )
  }

  function asin(x){
   return atan( x/Math.sqrt(1-x*x) )
  }

  function setmaths(){
    Math.sin=sin, Math.cos=cos, Math.tan=tan 
   ,Math.acos=acos ,Math.asin=asin ,Math.atan=atan 
   ,Math.modp=modp ,Math.modn=modn ,Math.culp=castulp
   ,Math.hasTrigfills=version()
  }
  
  return{
    sin:sin 
   ,cos:cos 
   ,tan:tan    //9 decprec
   ,acos:acos
   ,asin:asin
   ,atan:atan
   ,setmaths:setmaths
   ,modp:modp
   ,modn:modn
   ,culp:castulp
   ,version:version
  }

}())}

//Hopefuly exports to node, amd, commonjs or global object
var mdname='trigfills', facfnc=trigfillfactory
if (typeof exports !== 'undefined') 
{ if (typeof module !== 'undefined' && module.exports)
  { exports = module.exports = facfnc({}) }
  else { exports[mdname] = facfnc({}) }
} else {
  if (typeof define === 'function' && define.amd) 
  { define( mdname,[],function(){return facfnc({})} ) }
  else
  { (1,eval)('this')[mdname] = facfnc({}) } 
}
