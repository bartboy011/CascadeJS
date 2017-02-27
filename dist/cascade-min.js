function Cascade(e,t){function a(e,t){var a=e.className,s=a.match(t);null===s&&(e.className+=t)}function s(e,t,s,l,n){for(var i=e.parentNode,o=e.nodeValue,r=o.length,h=-1,d=1;++h<r;){var c=document.createElement(t),u=document.createTextNode(o[h]);c.className=s+d,c.appendChild(u),i.insertBefore(c,e),++d}i.removeChild(e),this.targetElement=i,this.children=i.childNodes,i.setAttribute("data-made-with","CascadeJS"),l&&a(i,n)}function l(e,t,a,s){e.style.animationDelay=a+"s",null!=s&&(e.style.animationDuration=s+"s"),e.className+=" "+t}this.targetElement=e,this.children=this.targetElement.childNodes,this.setDefaults=function(e){var t=e||{};this.classPrefix=t.classPrefix||"cascade char",this.tagName=t.tagName||"span",this.effect=t.effect||"fadeUp",this.totalTime=t.totalTime||.5,this.duration=t.duration,this.shouldFragment=null==t.shouldFragment||t.shouldFragment,this.shouldAppendTargetClass=null==t.shouldAppendTargetClass||t.shouldAppendTargetClass,this.targetClass=null!=t.targetClass?t.targetClass:" cascade-container"}.bind(this),this.flow=function(e){var t=e||{};this.setDefaults(t),this.shouldFragment&&this.fragment({},!1);var a=this.children,s=this.totalTime,n=this.effect,i=this.duration,o=-1;for(console.log(a);o++<a.length-1;){var r=a[o],h=s/(a.length-1)*o;console.log(r,n,h,i),l(r,n,h,i)}}.bind(this),this.fragment=function(e,t){var a=null==t||t,l=e||{};a&&this.setDefaults(l);var n=this.children;n.length>1?console.error("CascadeJS Error - error in target element:\n Please limit the amount children of this element to 1 (population control and all that)."):n[0].nodeType!==Node.TEXT_NODE?console.error("CascadeJS Error - error in target element:\n Please ensure that the immediate child of this element is text node. If you would like to animate a collection of divs, please add the option shouldFragment: false when calling Cascade.flow()."):s(n[0],this.tagName,this.classPrefix,this.shouldAppendTargetClass,this.targetClass)}.bind(this)}