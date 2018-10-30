Trigfills
=========

Sin, cos, tan, asin, acos and atan polyfills for cross browser consistency.

## Reason

Differences in trig function output between firefox and chrome, caused [strainer/fancy](github.com/strainer/fancy) simulations to run differently on the different browsers. Substituting the functions fixed this. 

These replacements do not have the full float64 bit accuracy which browser math functions have however they have about 10 decimal digits accuracy and can run a little quicker, as well as providing consistency across browsers.

## Usage

```javascript
//require or import trigfills.js
  
  Trgf=require('./pathto/trigfills.js')

//sin, cos, tan, asin, acos and atan methods
//are all available on the object.

  eg=Trgf.cos(rads)

//run setmaths() to override Math.cos ,Math.sin etc...

  Trgf.setmaths() 

//then Math trig functions are replaced with Trigfills:

  Math.cos === Trgf.cos
  Math.atan === Trgf.atan //etc... 
  Math.hasTrigfills === "version string"

```

## Algorithm/Developement

[www.mathonweb.com](http://www.mathonweb.com/help_ebook/calc_funcs.htm) has well described and good algorithms for these math functions. I extended the minimum precision of these from about 6 digits to about 10, by extending a little the talyor series which were given, and then by mining tweaked factors (non-exhaustively).


## Tests

`drafts/test_node.log` contains nodes test output and `test_moz.log` a firefox output. 

#### Example Precision:
```javascript
Math.tan(0.123)  // 0.1236240658 6927442
Trgf.tan(0.123)  // 0.1236240658 8797101
Math.sin(0.123)  // 0.12269009002 431533
Trgf.sin(0.123)  // 0.12269009002 68945
Math.cos(0.123)  // 0.99244503213 51935
Trgf.cos(0.123)  // 0.99244503213 90508
Math.atan(0.123) // 0.1223852814 7180266
Trgf.atan(0.123) // 0.1223852814 6213824
Math.asin(0.123) // 0.1233122751918 7199
Trgf.asin(0.123) // 0.1233122751818 901
Math.acos(0.123) // 1.447484051 6030247
Trgf.acos(0.123) // 1.447484051 6130065
```

#### Foibles

* Math.sin(Math.PI) returns `1.2246467991473532e-16` rather than 0 because `Math.PI` is a smidgen less that the true value of PI. This is explained in this [SO Topic](http://stackoverflow.com/questions/38295501/is-there-special-significance-to-16331239353195370-0) Trigfill's sin and cos do not follow this specification as the value is far below their noise floor. Math.sin(0) does return 0.

* Math.tan(Math.PI/2) does not return Infinity because of the same idea. Trigfill's tan does comply with this, it does not return Infinity as this result could bug calculations not expecting it.  


Version
=======
 0.9.4 - Minor speed tweaks
 0.9.3 - Minor speed tweaks
 0.9.2 - Working release candidate