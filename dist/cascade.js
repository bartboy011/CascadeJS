/*!
 * Copyright 2017 Joshua Bartlett
 * Available under MIT License
 */

function Cascade(element, options) {
  // set defaults
  this.targetElement = element; // element to segment and animate
  this.children = this.targetElement.childNodes; // pre-segment child nodes

  this.setDefaults = function (options) {
    var opts = options || {};
    this.classPrefix = opts.classPrefix || 'cascade char';
    this.tagName = opts.tagName || 'span';
    this.effect = opts.effect || 'fadeUp';
    this.totalTime = opts.totalTime || 0.5;
    this.duration = opts.duration;
    this.shouldFragment = opts.shouldFragment != null ? opts.shouldFragment : true;
    this.shouldAppendTargetClass = opts.shouldAppendTargetClass != null ? opts.shouldAppendTargetClass : true;
    this.targetClass = opts.targetClass != null ? opts.targetClass : ' cascade-container';
  }.bind(this);

  function appendTargetClass(target, targetClass) {
    var string = target.className,
        match = string.match(targetClass);

    if (match === null) {
      target.className += targetClass;
    }
  }

  // take a string inside an element, split it, wrap them
  // in their own tags, then inject the whole thing back
  // into the parent node
  function inject(element, tagName, classPrefix, shouldAppendTargetClass, targetClass) {
    var parent = element.parentNode,
        string = element.nodeValue,
        length = string.length,
        i = -1,
        count = 1;

    while (++i < length) {
      var newNode = document.createElement(tagName),
          newNodeText = document.createTextNode(string[i]);

      newNode.className = classPrefix + count;
      newNode.appendChild(newNodeText);

      parent.insertBefore(newNode, element);

      ++count;
    }

    parent.removeChild(element);

    this.targetElement = parent;
    this.children = parent.childNodes;

    parent.setAttribute('data-made-with', 'CascadeJS');

    if (shouldAppendTargetClass) {
      appendTargetClass(parent, targetClass);
    }
  }

  function animate(item, animationEffect, delay, duration) {
    item.style.animationDelay = delay + 's';

    // only add animation-duration to element if it was
    // specified in the options. Otherwise, let whatever is specified
    // in the CSS handle this.
    if (duration != null) {
      item.style.animationDuration = duration + 's';
    }

    item.className += ' ' + animationEffect;
  }

  this.flow = function (options) {
    // set defaults
    var opts = options || {};
    this.setDefaults(opts);

    // split the text into spans if segmentation
    // hasn't been performed yet
    if (this.shouldFragment) {
      this.fragment({}, false);
    }

    // iterate through spans and animate them
    var array = this.children,
        totalTime = this.totalTime,
        effect = this.effect,
        duration = this.duration,
        i = -1;
    while (i++ < array.length - 1) {
      var item = array[i],
          time = totalTime / (array.length - 1) * i;
      animate(item, effect, time, duration);
    }
  }.bind(this);

  this.fragment = function (options, setDefaults) {
    // set defaults only if they are being passed in from an
    // external call, ie new Cascade.fragment(options) to prevent
    // overwriting defaults when called internally
    var shouldSetDefaults = setDefaults != null ? setDefaults : true;
    var opts = options || {};

    // set defaults only if
    if (shouldSetDefaults) {
      this.setDefaults(opts);
    }

    var children = this.children;

    // throw some errors if elements are set up improperly
    if (children.length > 1) {
      console.error('CascadeJS Error - error in target element:\n Please limit the amount children of this element to 1 (population control and all that).');
    } else if (children[0].nodeType !== Node.TEXT_NODE) {
      console.error('CascadeJS Error - error in target element:\n Please ensure that the immediate child of this element is text node. If you would like to animate a collection of divs, please add the option shouldFragment: false when calling Cascade.flow().');
    } else {
      inject(children[0], this.tagName, this.classPrefix, this.shouldAppendTargetClass, this.targetClass);
    }
  }.bind(this);
}