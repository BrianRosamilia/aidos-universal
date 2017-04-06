module.exports = {
  ui: {
    ssl: true,
    address: "localhost",
    port: 3000
  },
  zuul: {
    ssl: true,
    address: "localhost",
    port: 8765
  },
  authKeys: [
    "access_token",
    "expires_in",
    "refresh_token",
    "scope",
    "token_type"
  ],
  data: [],
  logDirectory: ".",
  shibboleth: true,
  clientId: 'aidos',
  clientSecret: 'aidos-secret'
}
