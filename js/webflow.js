/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline JS may contain jQuery which is licensed under MIT
 */
/******/ (function() {
  var __webpack_modules__ = {};
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
  /******/ // Check if module is in cache
  /******/ var cachedModule = __webpack_module_cache__[moduleId];
  /******/ if (cachedModule !== undefined) {
  /******/ return cachedModule.exports;
  /******/ }
  /******/ // Create a new module (and put it into the cache)
  /******/ var module = __webpack_module_cache__[moduleId] = {
  /******/ // no module.id needed
  /******/ // no module.loaded needed
  /******/ exports: {}
  /******/ };
  /******/
  /******/ // Execute the module function
  /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  /******/
  /******/ // Return the exports of the module
  /******/ return module.exports;
  /******/ }
  /******/
  /************************************************************************/
  var Webflow = {};

  // Export module
  Webflow.init = function init() {
    // Find all data-ix-trigger elements and store them
    var $triggers = $('[data-ix-trigger]');
    
    // Initialize triggers
    $triggers.each(function(index, trigger) {
      var $trigger = $(trigger);
      var triggerData = $trigger.data('ix-trigger');
      
      if (triggerData) {
        // Add event listeners based on trigger data
        if (triggerData.type === 'hover') {
          $trigger.on('mouseenter', function() {
            // Handle hover animation start
          }).on('mouseleave', function() {
            // Handle hover animation end
          });
        }
        
        if (triggerData.type === 'scroll') {
          // Add scroll event listener
          $(window).on('scroll', function() {
            // Check if element is in viewport
            var rect = trigger.getBoundingClientRect();
            var isInViewport = (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
              // Handle scroll animation
            }
          });
        }
      }
    });
  };

  // Initialize on page load
  $(document).ready(function() {
    Webflow.init();
  });

  // Export to window
  window.Webflow = Webflow;
})();
