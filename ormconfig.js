module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gio',
  password: 'root',
  database: 'ecommerce',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsTableName: 'admin_migration_table',
  migrations: [__dirname + '/migration/*.js'],
  cli: {
    migrationsDir: 'migration'
  }
};
