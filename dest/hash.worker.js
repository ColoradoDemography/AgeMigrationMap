!function(o){function e(s){if(t[s])return t[s].exports;var n=t[s]={exports:{},id:s,loaded:!1};return o[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var t={};return e.m=o,e.c=t,e.p="dest",e(0)}([function(o,e,t){"use strict";var s=t(1);onmessage=function(o){s("https://gis.dola.colorado.gov/lookups/syaYRS",function(o){for(var e="0,1,2,3,4",t="",n=0;n<o.length;n++)0!==n&&(t+=","),t+=o[n].year;s("https://gis.dola.colorado.gov/lookups/sya?age ="+e+"&year="+t+"&county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125&choice=single",function(e){postMessage([e,o]),console.log("Worker is finished"),close()})})}},function(o,e){"use strict";o.exports=function(o,e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===t.readyState&&200===t.status){var o=JSON.parse(t.responseText);e&&e(o)}},t.open("GET",o),t.send()}}]);