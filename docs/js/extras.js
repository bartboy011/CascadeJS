;(function() {
  window.sideBarLocked = false;
  window.addEventListener('scroll', function() {
    if (!window.sideBarLocked && window.scrollY >= window.innerHeight) {
      document.getElementById('sidebar').style.position = 'fixed';
      window.sideBarLocked = true;
    } else if (window.sideBarLocked && window.scrollY < window.innerHeight) {
      document.getElementById('sidebar').style.position = 'absolute';
      window.sideBarLocked = false;
    }
  })
}).call(this);
