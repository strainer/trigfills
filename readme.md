Trigfills
=========

Sin, cos, tan, asin, acos and atan polyfills for when cross browser consistency is desired.

## Reason

Differences in trig function output between firefox and chrome, caused [strainer/fancy](github.com/strainer/fancy) simulations to run differently on the different browsers. Refilling the trig functions fixed this. 

These 'Trigfills' do not have the full float64 bit accuracy which browser math functions have (almost) however they *are* more than 'float32 accurate' and are about as quick as browser math, and they can provide consistency across browsers.

## Usage

```javascript
//require or import trigfills.js
  
  trigf=require('./pathto/trigfills.js')

//sin, cos, tan, asin, acos and atan methods
//are all available on the object.

  eg=trigf.cos(rads)

//run setmaths() to override Math.cos ,Math.sin etc...

  trigf.setmaths() 

//then Math trig functions are replaced with Trigfills:

  Math.cos === trigf.cos
  Math.atan === trigf.atan //etc... 
  Math.hasTrigfills === "version string"

```

## Algorithm/Developement

[www.mathonweb.com](http://www.mathonweb.com/help_ebook/calc_funcs.htm) has well described good algorithms for these math functions. I extended the minimum precision of these from about 6 digits to about 10, by extending a little the talyor series which were given, and then by mining tweaked factors (non-exhaustively).


## Tests

`drafts/test_node.log` contains nodes test output and `test_moz.log` a firefox output.  The functions have least 9 or 10 digits accuracy, and may run a little faster than browser Math equivalents.  

#### Foibles

* Math.sin(Math.PI) returns `1.2246467991473532e-16` rather than 0 because `Math.PI` is a smidgen less that the true value of PI. This is explained in this [SO Topic](http://stackoverflow.com/questions/38295501/is-there-special-significance-to-16331239353195370-0) Trigfill's sin and cos do not follow this specification as the value is far below their noise floor.

* Math.tan(Math.PI/2) does not return Infinity because of the same idea. Trigfill's tan does comply with this, it does not return Infinity as this result could bug calculations not expecting it. 


Version
=======
 0.9.2 - Working release candidate