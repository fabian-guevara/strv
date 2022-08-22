const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore  } = require('firebase-admin/firestore');

const serviceAccount = require('./strv-addressbook-guev-fabian-91589127e97d.json');

initializeApp({
  credential: cert(serviceAccount)
});

exports.db = getFirestore();
