import '../vendor/jquery-3.5.1';
import '../vendor/jquery-ui.min';
import '../vendor/jquery.ui.touch-punch.min';
import '../vendor/jquery.ui.rotatable.min';
import '../vendor/ie-alert/iealert.min';
import '../vendor/konami';

import '../vendor/jquery-ui-1.12.1/jquery-ui.css';
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../vendor/jquery.ui.core.css';
import '../vendor/jquery.ui.resizable.css';
import '../vendor/ie-alert/iealert/style.css';
import '../styles/css/all.css';

import './index.window';
import './index.normal-submit';
import './index.slider';
import './index.upload';
import './index.template';
import './index.dragger';

$(document).ready(function () {
  // ie alert
  $("body").iealert({
    support: 'ie9',
    title: '您的瀏覽器太舊啦！',
    text: '請更新您的瀏覽器，我們推薦您使用 Google Chrome',
    closeBtn: false,
    upgradeTitle: '下載 Google Chrome',
    upgradeLink: 'http://www.google.com/chrome/'
  });
});

