
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../node_modules/mini-antui/es/card/index');
require('../../node_modules/mini-antui/es/popup/index');
require('../../node_modules/mini-antui/es/grid/index');
require('../../node_modules/mini-antui/es/list/index');
require('../../node_modules/mini-antui/es/list/list-item/index');
require('../../node_modules/mini-antui/es/am-checkbox/index');
require('../../pages/index/index');
require('../../pages/center/center');
require('../../pages/fault/fault');
require('../../pages/service/service');
require('../../pages/explain/explain');
require('../../pages/detaIls/detaIls');
require('../../pages/search/search');
require('../../pages/login/login');
require('../../pages/problem/problem');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
