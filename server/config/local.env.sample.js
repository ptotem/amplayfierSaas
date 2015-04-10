'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'amplayfiersaas-secret',

  FACEBOOK_ID:      '776235569159321',
  FACEBOOK_SECRET:  '5f707505c34d428697a9a795ce2575af',

  TWITTER_ID:       'zyqWkCVjYSmGrN8npO8A6Q',
  TWITTER_SECRET:   'uC9bq49QbqqOGVH5i2dvvRn6ksHdyzZEPma83vDTE',

  GOOGLE_ID: '196960173445-3mpuuv8tdir6ilh5rd27pv1m4uvm80tm.apps.googleusercontent.com',
  GOOGLE_SECRET: '5gcPtli8QKI5YTGKTPIz9SVp',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
