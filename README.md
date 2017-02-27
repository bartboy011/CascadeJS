# CascadeJS

CascadeJS makes it simple to add cascading animations to individual letters or elements, using only vanilla javascript.

## Installation

```html
<link href='stylesheet' type='text/css' href='cascade.min.css' />
<script type='text/javascript' src='cascade.min.js' />
```

or

```bash
bower install cascadejs
```

## Quick Start

CascadeJS comes with default settings, so as long as you've included both the JS and CSS files, it will work right out of the box. Here's an example usage:

```html
<link href='stylesheet' type='text/css' href='cascade.css' />
<script type='text/javascript' src='cascade.js' />

<h1>Ooooohhhh, fancy.</h1>

<script>
  var element = document.getElementsByTagName('h1')[0];
  var cascade = new Cascade(element).flow();
</script>
```

## Usage

CascadeJS works by reading a line of text, splitting that text into spans around each character, and then adding animations to each span (by default). The splitting is modeled after charming.js, a vanilla javascript version of Lettering.js. Cascade requires an element be passed in on initialization:

```javascript
var cascade = new Cascade(element);
```

Cascade has two methods that can be called:

```javascript
var cascade = new Cascade(element);
cascade.fragment();
cascade.flow();
```

Calling `fragment()` will split the text without adding the animations, and must be called on an element with only a text node for a child. Calling `flow()` will first fragment the text, and then animate all children elements in a cascade. I would suggest calling `flow()` whenever possible.

### Usage of `flow()`

Initialize Cascade with an element:

```javascript
var cascade = new Cascade(element);
```

Then call `flow()` with any or none of the following options:

```javascript
cascade.flow({
  tagName: 'span',
  classPrefix: 'cascade char',
  effect: 'fadeUp',
  totalTime: 0.5,
  duration: 1,
  shouldFragment: true,
  shouldAppendTargetClass: true,
  targetClass: 'cascade-container'
});
```

`tagName:` - The tag that will wrap each character, ie `<span>A</span>`. Defaults to 'span'.

`classPrefix:` - The class(es) to be added to the tags, with an increasing number appended at the end, ie `<span class="cascade char1">A</span>`. Defaults to 'cascade char'.

`effect:` - The class name that adds the animation. In this default, 'fadeUp' uses a keyframe animation to fade in text while utilizing translateY to slide it up. Defaults to 'fadeUp'.

`totalTime:` - The amount of time in seconds as a float/integer from the first letter beginning it's animation to the last letter beginning it's animation. Defaults to `0.5`.

`duration:` - How long each letter's animation lasts. If you'd rather specify this in your CSS, just leave this option empty. Defaults to `null` and doesn't add this styling.

`shouldFragment:` - If you've previously called `fragment()` on this node, set this option to false otherwise the fragmentation will run again and throw an error. Defaults to true.

`shouldAppendTargetClass` - Defaults to true, will append a class to the target element after fragmenting.

`targetClass` - The class to be appended to the target element. Defaults to 'cascade-container'. Note: if you've already added the class to the element that you'd like appended, CascadeJS will skip the appending. Example:

```html
<!-- This element will have a class appended to it -->
<h1 class='text-center'>Hello!</h1>

<script>
  var element = document.getElementsByTagName('h1')[0];
  var cascade = new Cascade(element);
  cascade.flow({
    targetClass: 'cascade-container'
  });
</script>

<!-- This element will NOT have a class appended -->
<h1 class='text-center cascade-container'>Hello!</h1>

<script>
  var element = document.getElementsByTagName('h1')[0];
  var cascade = new Cascade(element);
  cascade.flow({
    targetClass: 'cascade-container'
  });
</script>
```

#### Example:

```html
<h1>Hello!</h1>

<script>
  var element = document.getElementsByClassName('cascade-container')[0];
  cascade = new Cascade(element).flow({
    totalTime: 2,
    duration: 1.5
  })
</script>
```

Produces:

```html
<h1 class='cascade-container'>
  <span class='cascade char1 fadeUp' style='animation-delay: 0s; animation-duration: 1.5s;'>H</span>
  <span class='cascade char2 fadeUp' style='animation-delay: 0.4s; animation-duration: 1.5s;'>e</span>
  <span class='cascade char3 fadeUp' style='animation-delay: 0.8s; animation-duration: 1.5s;'>l</span>
  <span class='cascade char4 fadeUp' style='animation-delay: 1.2s; animation-duration: 1.5s;'>l</span>
  <span class='cascade char5 fadeUp' style='animation-delay: 1.6s; animation-duration: 1.5s;'>o</span>
  <span class='cascade char6 fadeUp' style='animation-delay: 2s; animation-duration: 1.5s;'>!</span>
</h1>
```

Use Animate.css? Try this:

```javascript
var element = document.getElementsByClassName('cascade-container')[0];
var cascade = new Cascade(element).flow({
  classPrefix: 'animated char',
  effect: 'bounceInLeft'
});
```

You can also call `flow()` on an element that already has children nodes of any kind and they'll be animated as well:

```html
<div class='container'>
  <div>Element One</div>
  <div>Element Two</div>
  <div>Element Three</div>
  <div>Element Four</div>
</div>

<script>
  var element = document.getElementsByClassName('container')[0];
  var cascade = new Cascade(element);
  cascade.flow({
    shouldFragment: false,
    shouldAppendTargetClass: false
  });
```

### Usage of `fragment()`

`fragment()` will split and wrap your text, but not animate it. Just want to style each letter in an interesting way? Want a vanilla javascript replacement for lettering.js? This is it. `fragment()` accepts all the same options as `flow()`, but only the following will be applied:

```javascript
var cascade = new Cascade(element).fragment({
  tagName: 'span',
  classPrefix: 'cascade char'
});
```

You can then call

```javascript
cascade.flow({
  shouldFragment: false
});
```

When you're ready for some cool animations.
