module.exports = {
  ui: {
    ssl: false,
    address: "localhost",
    port: 3000
  },
  zuul: {
    ssl: false,
    address: "localhost",
    port: 8765
  },
  auth: {
    ssl: false,
    address: "localhost",
    port: 8443,
    nameSpace: "/uaa"
  },
  data: [],
  logDirectory: ".",
  shibboleth: false
}
