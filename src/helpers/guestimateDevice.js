// Kinda uggly way of estimating/guessing which type of device we run on but it
// should match the css media query logic
export default function guestimateDevice(w) {
  let allFalse = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isServer: false
  };

  if (w >= 320 && w <= 767) {
    return {
      ...allFalse,
      isMobile: true
    };
  } else if (w >= 768 && w <= 1024) {
    return {
      ...allFalse,
      isTablet: true
    };
  } else if (w >= 1025) {
    return {
      ...allFalse,
      isDesktop: true
    };
  }

  return {
    ...allFalse,
    isServer: true
  }; // in case of server-side rendering
}

// ==================================================
// Somewhat matching css:

/* Desktops
@media (min-width: 1281px) {}
*/

/* Laptops, Desktops
@media (min-width: 1025px) and (max-width: 1280px) {}
*/

/* Tablets, Ipads (portrait)
@media (min-width: 768px) and (max-width: 1024px) {}
*/

/* Tablets, Ipads (landscape)
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {}
*/

/* Low Resolution Tablets, Mobiles (Landscape)
@media (min-width: 481px) and (max-width: 767px) { }
*/

/* Most of the Smartphones Mobiles (Portrait)
@media (min-width: 320px) and (max-width: 480px) { }
*/
