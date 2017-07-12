'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var all = {
  env: process.env.NODE_ENV,
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 80,
  root: path.normalize(`${__dirname}/../../..`),
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
  sentryDSN: process.env.SENTRY_DSN,
  api: {
    url: process.env.API_URL || 'localhost',
    port: process.env.API_PORT || 80
  },
  secrets: {
    session: process.env.SESSION_SECRET
  },
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/bitelio',
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {}
);
