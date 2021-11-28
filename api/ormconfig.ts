module.exports = {
  type: 'mysql',
  host: 'db-server',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'taosk_db',
  entities: ['dist/src/**/*.{js,ts}'],
  seeds: ['dist/src/seeders/*.seed.{js,ts}'],
  factories: ['dist/src/factories/*.factory.{js,ts}'],
  cli: {
    seedersDir: 'dist/src/seeders',
    factoriesDir: 'dist/src/factories',
  },
  synchronize: false,
};
