const showLog = (el: any) => {
  const show = uni.getStorageSync("showLog");
  if (!show) {
    // el.parentNode && el.parentNode.removeChild(el)
    el.style.cssText =
      "display:none !important;width:0 !important;height: 0 !important;";
  }
};

export default showLog;
