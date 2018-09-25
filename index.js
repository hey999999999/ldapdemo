const ldap = require('ldapjs');
const assert = require('assert');
const client = ldap.createClient({
  //url: 'ldap://localhost:389/cn=testid,ou=jiec,dc=localhost'
  url: 'ldap://localhost:389'
});

client.bind('cn=taira,ou=People,dc=localhost', 'O011069', (err, data) => {
//client.bind('cn=root,dc=localhost', 'O011069', function(err, data) {
  assert.ifError(err);
  //console.log(err, data);
  //client.unbind();
});

const opts = {
  //filter: '(&(objectclass=*)(uid=12345))',
  filter: '(objectclass=*)',
  scope: 'sub',
  attributes: ['dn', 'sn', 'cn', 'userPassword']
};

client.search('cn=taira,ou=People,dc=localhost', opts, (err, res) => {
  assert.ifError(err);

  res.on('searchEntry', (entry) => {
    console.log('entry: ' + JSON.stringify(entry.object));
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
  });
});
