(function () {
  'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".contract-length .test-001-fee-component,.price-container.ng-star-inserted{display:none}.test-001-fee-component{text-align:center}.test-001-fee-p{display:inline}.test-001-fee-button{border:unset;background-color:unset;color:#5f2878;text-decoration:underline;padding:unset;font-weight:600;cursor:pointer}.test-001-backdrop{height:100%;width:100%;position:fixed;top:0;left:0;background-color:rgba(0,0,0,.75);display:none;z-index:107159}.test-001-lightbox{padding:20px;height:fit-content;width:80%;background:#fff;position:fixed;top:50%;right:50%;transform:translate(50%,-50%);display:none;z-index:107160}.test-001-show{display:block}.test-001-lightbox-top{border-bottom:1px solid #d3d3d3;display:flex;justify-content:space-between;padding-bottom:20px}.test-001-x{border:unset;background:unset;color:grey;font-size:20px;cursor:pointer}.test-001-lightbox-bottom{padding-top:20px}.test-001-text-container{margin-bottom:20px}.test-001-popup-copy{display:inline}.test-001-ok-button{border:unset;background-color:#5f2878;color:#fff;width:80%;line-height:2.75rem;height:3rem;cursor:pointer;display:flex;flex:0 1 18rem;justify-content:center;font-size:16px;font-weight:600;display:block;margin:0 auto;border-radius:6.25rem}@media screen and (min-width:768px){.test-001-lightbox{width:40%}}";
  styleInject(css_248z);

  function rafAsync() {
    return new Promise(function (resolve) {
      requestAnimationFrame(resolve);
    });
  } // function that waits for element to appear


  function checkElement(selector) {
    if (document.querySelector(selector) === null) {
      return rafAsync().then(function () {
        return checkElement(selector);
      });
    }

    return Promise.resolve(true);
  }

  var contractLengths = document.querySelectorAll('.contract-length');
  var textForPopUp = "The activation fee is the charge for the work that goes on behind the scenes to get you connected to our network. This is a one-off charge and will be added to your first bill. For more information see our\xA0";
  var linkForLinkInPopup = 'price guides.';
  var priceGuidelink = 'https://www.virginmedia.com/shop/the-legal-stuff/priceguides';

  var divComponent = function divComponent(className) {
    var _div$classList;

    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var div = document.createElement('div');

    (_div$classList = div.classList).add.apply(_div$classList, _toConsumableArray(className));

    if (action) div.addEventListener('click', action);
    return div;
  };

  var buttonComponent = function buttonComponent(copy, action, className) {
    var button = document.createElement('button');
    button.append(copy);
    button.classList.add(className);
    button.addEventListener('click', action);
    return button;
  };

  var paragraphComponent = function paragraphComponent(copy, className) {
    var p = document.createElement('p');
    var text = document.createTextNode(copy);
    p.append(text);
    p.classList.add(className);
    return p;
  };

  var h3Component = function h3Component(copy, className) {
    var h3 = document.createElement('h3');
    var text = document.createTextNode(copy);
    h3.append(text);
    h3.classList.add(className);
    return h3;
  };

  var linkComponent = function linkComponent(copy, className, link, newTab) {
    var a = document.createElement('a');
    var text = document.createTextNode(copy);
    a.append(text);
    a.href = link;
    a.classList.add(className);
    if (newTab) a.target = '_blank';
    return a;
  };

  var openOrCloseLightbox = function openOrCloseLightbox() {
    var lightboxDom = document.querySelector('.test-001-lightbox');
    var backdropDom = document.querySelector('.test-001-backdrop');

    if (lightboxDom && lightboxDom.classList.contains('test-001-show')) {
      backdropDom.classList.remove('test-001-show');
      lightboxDom.classList.remove('test-001-show');
    } else if (lightboxDom && !lightboxDom.classList.contains('test-001-show')) {
      backdropDom.classList.add('test-001-show');
      lightboxDom.classList.add('test-001-show');
    }
  };

  var activationFeeAction = function activationFeeAction() {
    if (document.querySelector('.test-001-lightbox')) {
      // show if exits
      openOrCloseLightbox();
    } else {
      // create new lightbox and backdrop
      var backdrop = divComponent(['test-001-backdrop', 'test-001-show'], openOrCloseLightbox);
      var lightbox = divComponent(['test-001-lightbox', 'test-001-show']);
      var topSection = divComponent(['test-001-lightbox-top']);
      var bottomSection = divComponent(['test-001-lightbox-bottom']);
      var heading = h3Component('Activation fee', 'test-001-heading');
      var xButton = buttonComponent('X', openOrCloseLightbox, 'test-001-x');
      topSection.append(heading);
      topSection.append(xButton);
      var textContainer = divComponent(['test-001-text-container']);
      var paragraph = paragraphComponent(textForPopUp, 'test-001-popup-copy');
      var link = linkComponent(linkForLinkInPopup, 'test-001-popup-link', priceGuidelink, true);
      textContainer.append(paragraph);
      textContainer.append(link);
      var okButton = buttonComponent('Ok', openOrCloseLightbox, 'test-001-ok-button');
      bottomSection.append(textContainer);
      bottomSection.append(okButton);
      lightbox.append(topSection);
      lightbox.append(bottomSection);
      document.querySelector('body').append(backdrop);
      document.querySelector('body').append(lightbox);
    }
  };

  var newActivationFeeComponent = function newActivationFeeComponent() {
    var div = divComponent(['test-001-fee-component']);
    var p = paragraphComponent("\xA335 activation fee\xA0", 'test-001-fee-p');
    var button = buttonComponent("What's this?", activationFeeAction, 'test-001-fee-button');
    div.append(p);
    div.append(button);
    return div;
  };

  var init = function init() {
    // change copy and insert button on cards
    if (contractLengths.length) {
      contractLengths.forEach(function (contract) {
        contract.insertAdjacentElement('afterend', newActivationFeeComponent());
      });
    }
  };

  checkElement('.contract-length').then(function () {
    init(); // as the component is rerendered there test is removed so it needs to be readded
    // const target = document.querySelector('.vm.vm-container');
    // const config = { childList: true, attributes: true, subtree: true };
    // const callback = (mutationList) => {
    //   mutationList.forEach((mutation) => {
    //     console.log(mutation);
    //     if (
    //       document.querySelector('.test-001-fee-component') === null
    //     ) {
    //       // init();
    //     }
    //   });
    // };
    // const observer = new MutationObserver(callback);
    // observer.observe(target, config);
  });

}());
