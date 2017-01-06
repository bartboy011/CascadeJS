function Cascade (element, options) {
  // set defaults
  this.element = element; // element to segment and animate
  this.children = this.element.childNodes; // pre-segment child nodes

  this.set_defaults = function (options) {
    var opts             = options || {};
    this.class_prefix    = opts.class_prefix || 'cascade char';
    this.tag_name        = opts.tag_name || 'span';
    this.effect          = opts.effect || 'fadeUp';
    this.total_time      = opts.total_time || 0.5;
    this.duration        = opts.duration;
    this.should_fragment = opts.should_fragment != null ? opts.should_fragment : true;
  }.bind(this);

  // take a string inside an element, split it, wrap them
  // in their own tags, then inject the whole thing back
  // into the parent node
  function inject(element, tag_name, class_prefix) {
    var parent = element.parentNode,
        string = element.nodeValue,
        length = string.length,
        i      = -1,
        count  = 1;

    while (++i < length) {
      var new_node = document.createElement(tag_name),
          new_node_text = document.createTextNode(string[i]);
      new_node.className = class_prefix + count;
      new_node.appendChild(new_node_text);
      parent.insertBefore(new_node, element);
      ++count;
    }
    parent.removeChild(element);
    this.element  = parent;
    this.children = parent.childNodes;
    parent.setAttribute('data-made-with', 'CascadeJS');
  }

  function animate (item, effect, time, duration) {
    item.style.animationDelay    = time + 's';
    if (duration != null) {
      item.style.animationDuration = duration + 's';
    }
    item.className += (' ' + effect);
  }

  this.flow = function (options) {
    // set defaults
    var opts = options || {};
    this.set_defaults(opts);

    // split the text into spans if segmentation
    // hasn't been performed yet
    if (this.should_fragment) { this.fragment({}, false); }

    // iterate through spans and animate them
    var array      = this.children,
        total_time = this.total_time,
        effect     = this.effect,
        duration   = this.duration,
        i = -1;
    while (i++ < array.length - 1) {
      var item = array[i],
          time = (total_time/(array.length - 1)) * i;
      animate(item, effect, time, duration);
    }
  }.bind(this);

  this.fragment = function (options, set_defaults) {
    // set defaults only if they are being passed in from an
    // external call, ie new Cascade.fragment(options) to prevent
    // overwriting defaults when called internally
    var should_set_defaults = set_defaults != null ? set_defaults : true;
    var opts                = options || {};

    // set defaults only if
    if (should_set_defaults) {this.set_defaults(opts);}

    var children = this.children;

    // throw some errors if elements are set up improperly
    if (children.length > 1) {
      console.error('CascadeJS Error - error in parent element:\n Please limit the amount children of this element to 1 (population control and all that).');
    } else if (children[0].nodeType !== Node.TEXT_NODE){
      console.error('CascadeJS Error - error in parent element:\n Please ensure that the immediate child of this element is text node.');
    } else {
      inject(children[0], this.tag_name, this.class_prefix);
    }
  }.bind(this);
}
