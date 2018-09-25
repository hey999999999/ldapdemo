const LdapAuth = require('ldapauth-fork');
const auth = new LdapAuth({
  url: 'ldap://localhost:389',
  bindDN: 'cn=admin,dc=localhost',
  bindCredentials: 'O011069',
  searchBase: 'ou=People,dc=localhost',
  searchFilter: '(cn={{username}})',
  reconnect: true
});
auth.on('error', (err) => console.error('LdapAuth: ', err));
auth.authenticate('taira', 'O011069', (err, user) => console.log(user));
auth.close((err) => console.log(err));
