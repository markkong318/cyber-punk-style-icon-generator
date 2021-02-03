
$.fn.installDivExtend = function() {
  return $.extend(this, {
    setSize: (width, height) => {
      return this.css('width', width + 'px')
        .css('height', height + 'px');
    },
    setPosition: (left, top) => {
      return this.css('top', top + 'px')
        .css('left', left + 'px');
    },
  });
};
