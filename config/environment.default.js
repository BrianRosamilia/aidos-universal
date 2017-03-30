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
  auth: {
    ssl: true,
    address: "localhost",
    port: 8443,
    nameSpace: "/uaa"
  },
  data: [],
  logDirectory: ".",
  shibboleth: true
}
