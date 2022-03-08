module.exports = {
  type: 'mysql',
  host: process.env.RDS_HOSTNAME || 'mariadb',
  port: parseInt(process.env.RDS_PORT, 10) || 3306,
  username: process.env.RDS_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || 'secret',
  database: process.env.RDS_DB_NAME || 'instagram',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
  timezone: '+09:00',
  cli: {
    migrationsDir: 'src/migrations',
  },
  seeds: ['dist/seeds/**/*.seed{.ts,.js}'],
};
