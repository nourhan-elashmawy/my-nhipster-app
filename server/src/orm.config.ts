import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeedUsersRoles1570200490072 } from './migrations/1570200490072-SeedUsersRoles';
import { CreateTables1570200270081 } from './migrations/1570200270081-CreateTables';
import { User } from './domain/user.entity';
import { Authority } from './domain/authority.entity';
// jhipster-needle-add-entity-to-ormconfig-imports - JHipster will add code here, do not remove

function ormConfig(): TypeOrmModuleOptions {
  let ormconfig: TypeOrmModuleOptions;

  if (process.env.BACKEND_ENV === 'prod') {
    ormconfig = {
      name: 'default',
      type: 'postgres',
      database: 'myNhipsterApp',
      host: 'postgresql',
      // port: ,
      username: 'myNhipsterApp',
      password: '',
      logging: false,
      // synchronize: false,
    };
  } else if (process.env.BACKEND_ENV === 'test') {
    ormconfig = {
      name: 'default',
      type: 'sqlite',

      database: ':memory:',
      logging: true,
    };
  } else if (process.env.BACKEND_ENV === 'dev') {
    ormconfig = {
      name: 'default',
      type: 'postgres',
      database: 'myNhipsterApp',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '12345',
      logging: false,
    };
  } else {
    ormconfig = {
      name: 'default',
      type: 'sqlite',
      database: `${__dirname}../../target/db/sqlite-dev-db.sql`,
      logging: true,
    };
  }

  return {
    synchronize: process.env.BACKEND_ENV === 'test',
    migrationsRun: true,
    entities: [
      User,
      Authority,
      // jhipster-needle-add-entity-to-ormconfig-entities - JHipster will add code here, do not remove
    ],
    migrations: [
      CreateTables1570200270081,
      SeedUsersRoles1570200490072,
      // jhipster-needle-add-migration-to-ormconfig-migrations - JHipster will add code here, do not remove
    ],
    autoLoadEntities: true,
    ...ormconfig,
  };
}

export { ormConfig };
