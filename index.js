/* eslint-disable no-unused-vars */
import styles from './index.scss';

function rafAsync() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
// function that waits for element to appear
function checkElement(selector) {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  }
  return Promise.resolve(true);
}

const contractLengths = document.querySelectorAll('.contract-length');

const textForPopUp = `The activation fee is the charge for the work that goes on behind the scenes to get you connected to our network. This is a one-off charge and will be added to your first bill. For more information see our\u00A0`;
const linkForLinkInPopup = 'price guides.';
const priceGuidelink =
  'https://www.virginmedia.com/shop/the-legal-stuff/priceguides';

const divComponent = (className, action = undefined) => {
  const div = document.createElement('div');
  div.classList.add(...className);
  if (action) div.addEventListener('click', action);
  return div;
};

const buttonComponent = (copy, action, className) => {
  const button = document.createElement('button');
  button.append(copy);
  button.classList.add(className);
  button.addEventListener('click', action);
  return button;
};

const paragraphComponent = (copy, className) => {
  const p = document.createElement('p');
  const text = document.createTextNode(copy);
  p.append(text);
  p.classList.add(className);
  return p;
};

const h3Component = (copy, className) => {
  const h3 = document.createElement('h3');
  const text = document.createTextNode(copy);
  h3.append(text);
  h3.classList.add(className);
  return h3;
};

const linkComponent = (copy, className, link, newTab) => {
  const a = document.createElement('a');
  const text = document.createTextNode(copy);
  a.append(text);
  a.href = link;
  a.classList.add(className);
  if (newTab) a.target = '_blank';
  return a;
};

const openOrCloseLightbox = () => {
  const lightboxDom = document.querySelector('.test-001-lightbox');
  const backdropDom = document.querySelector('.test-001-backdrop');

  if (
    lightboxDom &&
    lightboxDom.classList.contains('test-001-show')
  ) {
    backdropDom.classList.remove('test-001-show');
    lightboxDom.classList.remove('test-001-show');
  } else if (
    lightboxDom &&
    !lightboxDom.classList.contains('test-001-show')
  ) {
    backdropDom.classList.add('test-001-show');
    lightboxDom.classList.add('test-001-show');
  }
};

const activationFeeAction = () => {
  if (document.querySelector('.test-001-lightbox')) {
    // show if exits
    openOrCloseLightbox();
  } else {
    // create new lightbox and backdrop
    const backdrop = divComponent(
      ['test-001-backdrop', 'test-001-show'],
      openOrCloseLightbox,
    );

    const lightbox = divComponent([
      'test-001-lightbox',
      'test-001-show',
    ]);
    const topSection = divComponent(['test-001-lightbox-top']);
    const bottomSection = divComponent(['test-001-lightbox-bottom']);

    const heading = h3Component('Activation fee', 'test-001-heading');
    const xButton = buttonComponent(
      'X',
      openOrCloseLightbox,
      'test-001-x',
    );

    topSection.append(heading);
    topSection.append(xButton);

    const textContainer = divComponent(['test-001-text-container']);
    const paragraph = paragraphComponent(
      textForPopUp,
      'test-001-popup-copy',
    );
    const link = linkComponent(
      linkForLinkInPopup,
      'test-001-popup-link',
      priceGuidelink,
      true,
    );
    textContainer.append(paragraph);
    textContainer.append(link);
    const okButton = buttonComponent(
      'Ok',
      openOrCloseLightbox,
      'test-001-ok-button',
    );
    bottomSection.append(textContainer);
    bottomSection.append(okButton);

    lightbox.append(topSection);
    lightbox.append(bottomSection);
    document.querySelector('body').append(backdrop);
    document.querySelector('body').append(lightbox);
  }
};

const newActivationFeeComponent = () => {
  const div = divComponent(['test-001-fee-component']);
  const p = paragraphComponent(
    '£35 activation fee\u00A0',
    'test-001-fee-p',
  );
  const button = buttonComponent(
    `What's this?`,
    activationFeeAction,
    'test-001-fee-button',
  );
  div.append(p);
  div.append(button);

  return div;
};

const init = () => {
  // change copy and insert button on cards
  if (contractLengths.length) {
    contractLengths.forEach((contract) => {
      contract.insertAdjacentElement(
        'afterend',
        newActivationFeeComponent(),
      );
    });
  }
};

checkElement('.contract-length').then(() => {
  init();

  // as the component is rerendered there test is removed so it needs to be readded

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
