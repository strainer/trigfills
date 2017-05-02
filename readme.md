Trigfills
=========

Sin,cos,tan,asin,acos and atan polyfills for when cross browser agreeance is desired.

Reason
======
Differences in trig function output between firefox and chrome, caused strainer/fancy simulations to run differently on the different browsers. Polyfilling the trig functions fixed this.

Install
=======
The usual

Tests
=====
`drafts/tests.log` contains test output showing the functions have least 8 digits
accuracy, and may run a little faster than native Math equivilents.

Version
=======
This is a tested working beta version. Accuracy has been optimised a little by
roughly mining tweaks to the functions 'Taylor series' factors. Sooner or later I will be tempted to try this properly. In the meantime accuracy and performance seems very good.