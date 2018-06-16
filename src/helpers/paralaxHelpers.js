let intervalId = null;
let callbacks = [];
export let currentWindowHeight = 1000; // in case of server-side rendering
export let currentWindowWidth = 1000; // in case of server-side rendering

if (window) {
  currentWindowHeight = window.innerHeight;
  currentWindowWidth = window.innerWidth;
}

function getCurrentDocumentHeight() {
  if (document) {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }
  return 200;
}

function handleWindowResize(e) {
  currentWindowHeight = e.target.innerHeight;
  currentWindowWidth = e.target.innerWidth;
}

export function startTrackingScroll(frameRate = 60) {
  const intervalInMs = 1000 / frameRate;
  if (document) {
    window.addEventListener('resize', handleWindowResize);

    intervalId = setInterval(() => {
      const currentOffset = document.documentElement.scrollTop;
      const currentDocumentHeight = getCurrentDocumentHeight();
      const relativeOffset =
        currentOffset / (currentDocumentHeight - currentWindowHeight);

      for (let i = 0, len = callbacks.length; i < len; i++) {
        try {
          //looks hacky, but is the most compatible way of pushing functions of
          //the stack into the event loop.
          callbacks[i]({
            currentOffset,
            relativeOffset,
            currentWindowHeight,
            currentWindowWidth,
            currentDocumentHeight
          });
        } catch (e) {
          console.log(
            'Error occured when trying to run animation callbacks',
            e
          );
        }
      }
    }, intervalInMs);
  }
}

export function stopTrackingScroll() {
  clearInterval(intervalId);
}

export function addAnimationCallBack(cb) {
  if (typeof cb === 'function') {
    callbacks.push(cb);
  }
}

// calculates the vertical distance between a child and a parent html node
export function offsetBetween(current, final, offset = 0) {
  if (current === final) {
    return offset;
  } else {
    offset += current.offsetTop;
    current = current.parentNode;
    return offsetBetween(current, final, offset);
  }
}

export function offsetToDocument(elem) {
  let box = { top: 0, left: 0 };
  let win = { pageXOffset: 0, pageYOffset: 0 };
  let docElem = { scrollTop: 0, scrollLeft: 0, clientTop: 0, clientLeft: 0 };
  if (window && document) {
    win = window;
    docElem = document.documentElement;
  }

  if (elem.getBoundingClientRect) {
    box = elem.getBoundingClientRect();
  }

  return {
    top:
      box.top +
      (win.pageYOffset || docElem.scrollTop) -
      (docElem.clientTop || 0),
    left:
      box.left +
      (win.pageXOffset || docElem.scrollLeft) -
      (docElem.clientLeft || 0)
  };
}
