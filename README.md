# CascadeJS

CascadeJS makes it simple to add cascading animations to individual letters in a string of text, using only vanilla javascript.

## Installation

```html
<link href='stylesheet' type='text/css' href='cascade.css' />
<script type='text/javascript' src='cascade.js' />
```

## Quick Start

CascadeJS comes with default settings, so as long as you've included both the JS and CSS files, it will work right out of the box. Here's an example usage:

```html
<link href='stylesheet' type='text/css' href='cascade.css' />
<script type='text/javascript' src='cascade.js' />

<h1 class='cascade-container'>Ooooohhhh, fancy.</h1>

<script>
  var element = document.getElementByClassName('cascade-container')[0];
  var cascade = new Cascade(element).flow();
</script>
```

## Usage

CascadeJS works by reading a line of text, splitting that text into spans around each character, and then adding animations to each span (by default). The splitting is modeled after charming.js, a vanilla javasript version of Lettering.js. Cascade requires an element be passed in on initialization:

```javascript
var cascade = new Cascade(element);
```

This element must have only one child node, and that child node needs to be a text node. In plain English, don't call Cascade on a tag that has another tag nested in it.

Cascade has two methods that can be called:

```javascript
var cascade = new Cascade(element);
cascade.fragment();
cascade.flow();
```

Calling `fragment()` will only split the text without adding the animations. Calling `flow()` will first fragment the text, and then animate. I would suggest calling `flow()` whenever possible.

### Usage of `flow()`

Initialize Cascade with an element:

```javascript
var cascade = new Cascade(element);
```

Then call `flow()` with any or none of the following options:

```javascript
cascade.flow({
  tag_name: 'span',
  class_prefix: 'cascade char',
  effect: 'fadeUp',
  total_time: 0.5,
  duration: 1,
  should_fragment: true
});
```

`tag_name:` - The tag that will wrap each character, ie `<span>A</span>`. Defaults to 'span'.

`class_prefix:` - The class(es) to be added to the tags, with an increasing number appended at the end, ie `<span class="cascade char1">A</span>`. Defaults to 'cascade char'.

`effect:` - The class name that adds the animation. In this default, 'fadeUp' uses a keyframe animation to fade in text while utilizing translateY to slide it up. Defaults to 'fadeUp'.

`total_time:` - The amount of time in seconds as a float/integer from the first letter beginning it's animation to the last letter beginning it's animation. Defaults to `0.5`.

`duration:` - How long each letter's animation lasts. If you'd rather specify this in your CSS, just leave this option empty. Defaults to `null` and doesn't add this styling.

`should_fragment:` - If you've previously called `fragment()` on this node, set this option to false otherwise the fragmentation will run again and throw an error. Defaults to true.

#### Example:

```html
<h1 class='cascade-container'>Hello!</h1>

<script>
  var element = document.getElementsByClassName('cascade-container')[0];
  cascade = new Cascade(element).flow({
    total_time: 2,
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
  class_prefix: 'animated char',
  effect: 'bounceInLeft'
});
```

### Usage of `fragment()`

`fragment()` will split and wrap your text, but not animate it. Just want to style each letter in an interesting way? Want a vanilla javascript replacement for lettering.js? This is it. `fragment()` accepts all the same options as `flow()`, but only the following will be applied:

```javascript
var cascade = new Cascade(element).fragment({
  tag_name: 'span',
  class_prefix: 'cascade char'
});
```

You can then call

```javascript
cascade.flow({
  should_fragment: false
})
```

When you're ready for some cool animations.
