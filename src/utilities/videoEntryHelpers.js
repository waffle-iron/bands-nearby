import { isSmallScreen } from './utils';

  // pauses all videos but current video using youTube api
  export const pauseAllButPlaying = (event) => {
    document.querySelectorAll('iframe').forEach((video) => {
      if (video !== event.target.a) {
        video.contentWindow.postMessage(`{"event":"command","func":"pauseVideo","args":""}`, '*');
      }
    });
  };

  export const hideControlsMobile = () => {
    if (isSmallScreen()) {
      return { height: 'auto', width: '100%', playerVars: { autoplay: 0, controls: 0, playsinline: 1 } };
    }
    return { height: 'auto', width: '100%', playerVars: { autoplay: 0 } };
  };
