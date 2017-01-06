function Cascade (element, options) {
  // set defaults
  this.element = element; // element to segment and animate
  this.children = this.element.childNodes; // pre-segment child nodes
  this.options = options || {};
  this.class_prefix = this.options.class_prefix || 'ripple char';
  this.tag_name = this.options.tag_name || 'span';
  this.effect = this.options.effect || 'fadeUp';
  this.total_time = this.options.total_time || 0.5;

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
  }

  function animate (item, effect, time) {
    item.style.animationDelay = time + 's';
    item.className += (' ' + effect);
  }

  this.flow = function (options) {
    // set defaults
    var opts = options || {};
    var should_fragment = opts.should_fragment != null ? opts.should_fragment : true;

    // split the text into spans if segmentation
    // hasn't been performed yet
    if (should_fragment) { this.fragment(); }

    // iterate through spans and animate them
    var array = this.children,
        total_time = this.total_time,
        effect = this.effect,
        i = -1;
    while (i++ < array.length - 1) {
      var item = array[i],
          time = (total_time/array.length) * i;
      animate(item, effect, time);
    }
  }.bind(this);

  this.fragment = function () {
    var children = this.children;
    if (children.length > 1) {
      console.error('CascadeJS Error - error in parent element:\n Please limit the amount children of this element to 1 (population control and all that).');
    } else if (children[0].nodeType !== Node.TEXT_NODE){
      console.error('CascadeJS Error - error in parent element:\n Please ensure that the immediate child of this element is text node.');
    } else {
      inject(children[0], this.tag_name, this.class_prefix);
    }
  }.bind(this);
}
