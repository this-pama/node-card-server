import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import licence from '../controller/licence';
import cpLicence from '../controller/cpLicence';
import subCpLicence from '../controller/subCpLicence';
import retailerLicence from '../controller/retailerLicence';
import trialLicence from '../controller/trialLicence';
import request from '../controller/request';


let router = express();

// connect to db
initializeDb(db => {


  // api routes v1 (/v1)
  router.use('/licence', licence({ config, db }));
  router.use('/cpLicence', cpLicence({ config, db }));
  router.use('/retailerLicence', retailerLicence({ config, db }));
  router.use('/subCpLicence', subCpLicence({ config, db }));
  router.use('/trialLicence', trialLicence({ config, db }));
  router.use('/request', request({ config, db }));

});

export default router;
