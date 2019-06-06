'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _licence = require('../controller/licence');

var _licence2 = _interopRequireDefault(_licence);

var _cpLicence = require('../controller/cpLicence');

var _cpLicence2 = _interopRequireDefault(_cpLicence);

var _subCpLicence = require('../controller/subCpLicence');

var _subCpLicence2 = _interopRequireDefault(_subCpLicence);

var _retailerLicence = require('../controller/retailerLicence');

var _retailerLicence2 = _interopRequireDefault(_retailerLicence);

var _trialLicence = require('../controller/trialLicence');

var _trialLicence2 = _interopRequireDefault(_trialLicence);

var _request = require('../controller/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

  // api routes v1 (/v1)
  router.use('/licence', (0, _licence2.default)({ config: _config2.default, db: db }));
  router.use('/cpLicence', (0, _cpLicence2.default)({ config: _config2.default, db: db }));
  router.use('/retailerLicence', (0, _retailerLicence2.default)({ config: _config2.default, db: db }));
  router.use('/subCpLicence', (0, _subCpLicence2.default)({ config: _config2.default, db: db }));
  router.use('/trialLicence', (0, _trialLicence2.default)({ config: _config2.default, db: db }));
  router.use('/request', (0, _request2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map