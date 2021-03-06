/*

 HTML_QuickForm2: support functions for repeat elements

 Package version 2.0.0

 http://pear.php.net/package/HTML_QuickForm2



 Copyright 2006-2012, Alexey Borzov, Bertrand Mansion

 Licensed under new BSD license

 http://opensource.org/licenses/bsd-license.php

*/

qf.elements.Repeat=function(a,b,d,e,f){a.repeat=this;this.repeatPrototype=this.form=null;this.container=a;this.itemId=b;this.rulesTpl=e;this.scriptsTpl=f;this.triggers=d;e=this.getElementsByClass("repeatAdd",a);for(b=0;d=e[b];b++)qf.events.addListener(d,"click",qf.elements.Repeat.addHandler);a=this.getElementsByClass("repeatRemove",a);for(b=0;d=a[b];b++)qf.events.addListener(d,"click",qf.elements.Repeat.removeHandler)};

qf.elements.Repeat.addHandler=function(a){for(var a=qf.events.fixEvent(a),b=a.target;b&&!qf.classes.has(b,"repeat");)b=b.parentNode;b&&b.repeat&&b.repeat.onBeforeAdd()&&b.repeat.add();a.preventDefault()};qf.elements.Repeat.removeHandler=function(a){for(var a=qf.events.fixEvent(a),b=a.target,d;b&&!qf.classes.has(b,"repeat");)qf.classes.has(b,"repeatItem")&&(d=b),b=b.parentNode;b&&d&&b.repeat&&b.repeat.onBeforeRemove(d)&&b.repeat.remove(d);a.preventDefault()};

qf.elements.Repeat.prototype={getElementsByClass:function(){return document.getElementsByClassName?function(a,b){return b.getElementsByClassName(a)}:function(a,b){for(var d=b.getElementsByTagName("*"),e=[],f=0,c;c=d[f];f++)qf.classes.has(c,a)&&e.push(c);return e}}(),findIndexByItem:function(a){var b=RegExp("^"+this.itemId.replace(":idx:","([a-zA-Z0-9_]+?)")+"$"),d;if(a.id&&(d=b.exec(a.id)))return d[1];for(var a=a.getElementsByTagName("*"),e=0,f;f=a[e];e++)if(f.id&&(d=b.exec(f.id)))return d[1];return null},

findItemByIndex:function(a){a=this.itemId.replace(":idx:",a);if((a=document.getElementById(a))&&!qf.classes.has(a,"repeatItem")){do a=a.parentNode;while(a&&!qf.classes.has(a,"repeatItem"))}return a},findForm:function(){for(var a=this.container;a&&"form"!==a.nodeName.toLowerCase();)a=a.parentNode;return a},generateIndex:function(){var a;do a="add"+Math.round(1E4*Math.random());while(document.getElementById(this.itemId.replace(":idx:",a)));return a},add:function(a){this.repeatPrototype||(this.repeatPrototype=

this.getElementsByClass("repeatPrototype",this.container)[0]);if(0==arguments.length||!/^[a-zA-Z0-9_]+$/.test(a))a=this.generateIndex();var b=this.getElementsByClass("repeatItem",this.container),d=b[b.length-1],e=this.repeatPrototype.cloneNode(!0);qf.classes.remove(e,"repeatPrototype");e.id&&(e.id=e.id.replace(":idx:",a));for(var f=e.getElementsByTagName("*"),b=0,c;c=f[b];b++){c.id&&(c.id=c.id.replace(":idx:",a));c.name&&(c.name=c.name.replace(":idx:",a));if(c.type&&("checkbox"==c.type||"radio"==

c.type))c.value=c.value.replace(":idx:",a);c.htmlFor&&(c.htmlFor=c.htmlFor.replace(":idx:",a));"script"==c.nodeName.toLowerCase()&&eval(c.innerHTML.replace(/:idx:/g,a));qf.classes.has(c,"repeatAdd")&&qf.events.addListener(c,"click",qf.elements.Repeat.addHandler);qf.classes.has(c,"repeatRemove")&&qf.events.addListener(c,"click",qf.elements.Repeat.removeHandler)}d.parentNode.insertBefore(e,d.nextSibling);this.scriptsTpl&&eval(this.scriptsTpl.replace(/:idx:/g,a));if(this.rulesTpl&&(this.form||(this.form=

this.findForm()),this.form.validator)){d=eval(this.rulesTpl.replace(/:idx:/g,a));for(b=0;e=d[b];b++)this.form.validator.rules.push(e)}this.onChange();return a},remove:function(a){var b;if("string"==typeof a&&(b=a,!(a=this.findItemByIndex(b))))return;if(this.rulesTpl&&(this.form||(this.form=this.findForm()),this.form.validator)){var d=new qf.Map,e=this.form.validator.rules,f,c;b||(b=this.findIndexByItem(a));for(c=0;f=this.triggers[c];c++)d.set(f.replace(":idx:",b),!0);for(c=e.length-1;b=e[c];c--)d.hasKey(b.owner)&&

e.splice(c,1)}a.parentNode.removeChild(a);this.onChange()},onBeforeAdd:function(){return!0},onBeforeRemove:function(){return!0},onChange:function(){}};

