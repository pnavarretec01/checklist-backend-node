
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const memoryStore = new session.MemoryStore();

const KEYCLOAK_REALM_PUBLIC_KEY = process.env.KEYCLOAK_REALM_PUBLIC_KEY;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;

const keycloakConfig = {
  "clientId": KEYCLOAK_CLIENT_ID,
  "serverUrl": "http://172.30.100.201:28080/auth",
  "realm": KEYCLOAK_REALM,
  "credentials": {
    secret: KEYCLOAK_CLIENT_SECRET,
  },
  "realm-public-key": KEYCLOAK_REALM_PUBLIC_KEY,
  "ssl-required": "external",
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = {
  keycloak,
  memoryStore,
};