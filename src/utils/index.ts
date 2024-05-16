const ua = window.navigator.userAgent.toLowerCase();

export const isWxWork = () => {
  return ua.indexOf('wxwork') > -1;
};

export const isFeishu = () => {
  // @ts-ignore
  return ua.indexOf('feishu') > -1 || !!window.h5sdk;
};

export const isDingTalk = () => {
  return ua.indexOf('dingtalk') > -1;
};

export const loadScript = (url: string, callback = () => {}) => {
  if (!url) {
    return;
  }
  const sdkScript = document.createElement('script');
  sdkScript.type = 'text/javascript';
  sdkScript.src = url;

  sdkScript.onload = function () {
    callback();
  };
  sdkScript.onerror = function () {
    console.log('onerror');
  };

  document.getElementsByTagName('head')[0]?.appendChild(sdkScript);
};
