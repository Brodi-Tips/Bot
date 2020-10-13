module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'postgresql',
    connection: {
      host: 'ec2-34-238-26-109.compute-1.amazonaws.com',
      user: 'woasmttsxtcklw',
      password: '261283040e6c3ab2ab8946617497a53222d8de1cbf8510e36a6d449166a3fdb9',
      database: 'd89ukt02te152r',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
    seeds: { directory: './database/seeds' },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-34-238-26-109.compute-1.amazonaws.com',
      user: 'woasmttsxtcklw',
      password: '261283040e6c3ab2ab8946617497a53222d8de1cbf8510e36a6d449166a3fdb9',
      database: 'd89ukt02te152r',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
    seeds: { directory: './database/seeds' },
  },
};
