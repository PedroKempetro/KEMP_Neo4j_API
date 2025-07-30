export const databaseConfig = {
  neo4j: {
    uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
    username: process.env.NEO4J_USERNAME || 'neo4j',
    password: process.env.NEO4J_PASSWORD || 'password',
  },
  otherGraphDatabases: {
    // Configuration for other graph databases can be added here
    // Example:
    // arangoDB: {
    //   uri: process.env.ARANGODB_URI || 'http://localhost:8529',
    //   username: process.env.ARANGODB_USERNAME || 'root',
    //   password: process.env.ARANGODB_PASSWORD || 'password',
    // },
  },
};