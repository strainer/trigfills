// tools
// =====


if(typeof performance!=='undefined')
{ timing=perflast } 
else if(typeof process!=='undefined')	
{ timing=proclast }
else
{ timing=datelast }


function perflast(last){ return performance.now()-(last||0) }
function datelast(last){ return Date.now()-(last||0) }
function proclast(last){
  if(!last) return process.hrtime()
  var b=process.hrtime(last)
  return ((b[0]*1000) + (b[1]/1000000))
}


bench = function (mthd, bentime, mthd_legend, mthd_arg) {
    
  if( typeof bentime ==='undefined' ){ bentime=1 }
  if( typeof mthd_legend ==='undefined' ){ mthd_legend=mthd.name }
  
  bentime=bentime*1000
  
  var mockres=0, tallyret=0, tallyfrq=0
  
  var qqtlen=1
  if(typeof mthd_arg !== 'undefined'){ qqtlen=1 }
  
  var maxret=-Infinity ,minret=Infinity
  
  var tfirst=timing()
  var atm=ctm=dtm=timing(tfirst)
    
  var nreps=0.5, treps=0
  
  while(ctm<50){
    treps+=(nreps*=2)
    if(typeof mthd_arg !== 'undefined'){
      for(i=0;i<nreps;i++)	{ tallyret+=mthd(mthd_arg) } 
    }else{
      for(i=0;i<nreps;i++)	{ tallyret+=mthd() }
    }
    ctm=timing(tfirst)
  }
    
  tallyfrq=treps
  
  var roughtmrep=ctm/treps
  var duereps=Math.floor(bentime/roughtmrep)
  if(duereps<2){ 
    console.log(mthd_legend+" "+(treps/ctm).toFixed(4)+" func/s "+
      "  avg : "+tallyret/tallyfrq)
    return
  }
  
  var batches=Math.floor(Math.log(duereps)+0.5)
  if(batches>10){ batches=10 }
  
  var batchreps=Math.floor(duereps/batches)
  
  if(batches>10){ 

    if(typeof mthd_arg !== 'undefined')
    { for(var i=0; i<batchreps; i++)	
      { var r=mthd(mthd_arg)
        tallyret+=r
        if (r>maxret){ maxret=r}
        else{ if (r<minret){ minret=r } }
      }	
    }else{
      for(i=0;i<batchreps;i++)	
      { var r=mthd(mthd_arg) 
        tallyret+=r
        if (r>maxret){ maxret=r }
        else{ if (r<minret){ minret=r } }
      }
    }
    tallyfrq+=batchreps
    batches--
  }
  
  var mopsigma=0,mopsfrq=0, bults=[]
  while(timing(tfirst)<bentime){
    var tstart=timing()
    
    if(typeof mthd_arg !== 'undefined'){
      for(i=0;i<batchreps;i++)	{ tallyret+=mthd(mthd_arg) } 
    }else{
      for(i=0;i<batchreps;i++)	{ tallyret+=mthd() }
    }

    var mops=batchreps/timing(tstart)
    bults.push(mops)
    mopsigma+=mops*mops
    mopsfrq++
    tallyfrq+=batchreps
  }
  
  var eb=bults.length
  if(eb>6){ 
    bults.sort( function(a,b){ return a-b } ) //ascending mops
    var edge=Math.floor(eb/8)+1, sume=0
    for(var i=edge+1;i<eb-edge;i++){
      sume+=bults[i]*bults[i]
    }
    ops=(Math.sqrt(sume/((eb-edge*2-1)))/1000).toFixed(4)
  }else{
    var rms=Math.sqrt(mopsigma/mopsfrq)
    ops=(rms/1000).toFixed(4)
  }
  
  console.log(mthd_legend+" "+ops+" Mfunc/s "+
    "  avg : "+tallyret/tallyfrq)

}

var firstrun=1

benchn = function(n,a,b,c,d){ 

  if(firstrun)
  { firstrun=false;
    var k=bench(Math.sqrt,b,c,d)	
  }
  
  for(var i=0;i<n;i++) { bench(a,b,c,d);} 
}


function fnl(num, length) {
  var r = "" + num;
  while (r.length < length) {
      r = " " + r;
  }
  return r;
}

distrib =function(f,rs, ai,ei, n, a,b,c) //func rs  st fn divs
{
  var dv=(ei-ai)/rs
  
  var dist=[]
  for(var i=0;i<rs;i++) { dist[i]=0; }
  
  for(var i=0; i<n; i++)
  {
    var p=f(a,b,c)-ai
    dist[Math.floor(p/dv)]++
  }

  var ot="",oh=""
  for(var i=0; i<rs; i++)
  { 
    oh+=fnl(((ai+dv*(i+0.5))*100/dv).toFixed(2),9)
    ot+=fnl((dist[i]*100/n).toFixed(4),9) }
  
  var lv=0,hv=0
  for(var i=0; i<((rs-1)/2); i++)
  {
    lv+=dist[i]; hv+=dist[rs-1-i]
  }
  console.log(oh)
  console.log(ot)
  console.log((lv*100/n).toFixed(7),(hv*100/n).toFixed(7),((lv-hv)*100/n).toFixed(7))

}



pr = function() {
  var args = Array.prototype.slice.call(arguments);
  var result = args.join(" ");
  console.log(result);
}


if (typeof require !=="undefined") var filestreams = require('fs'); //nodejs
savedata =function(fname,fn,n)
{
  var resu = new Uint32Array(n)
  var k,q=0

  for(i=0;i<n;i++) 
  { k=fn()
    resu[i]=k
    q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
  a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
  pr("Mean val was "+q/n)
}

savedata2 =function(fname,fn,fn2,n)
{
  var resu = new Uint32Array(n)
  var k,q=0

  for(i=0;i<n;) 
  { 
    k=(fn()-fn2())>>>0
    resu[i++]=k
    //~ k=fn2()
    //~ resu[i++]=k
    q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
  a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
  pr("Mean val was "+q/n)
}


function heredoc (f) {
    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};


cmd_exec= function(cmd, args, cb_stdout, cb_end) {
  var spawn = require('child_process').spawn,
    child = spawn(cmd, args),
    me = this;
  me.exit = 0;  // Send a cb to set 1 when cmd exits
  child.stdout.on('data', function (data) { cb_stdout(me, data) });
  child.stdout.on('end', function () { cb_end(me) });
}




var As,Ai
regurg= function(A)
{
  if(As==null||A!=null){ As=A; Ai=0; return NaN}
  if(As!=null&&Ai==As.length){ Ai=0; }
  return As[Ai++]
}
