import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/v1',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const production = process.env.ENV == 'prod';
        const synchronize = !production;
        return {
          type: 'mysql',
          host: 'localhost',
          port: 8889,
          username: 'root',
          password: 'root',
          database:'graphql_tutorial',
          autoLoadEntities: true,
          synchronize: synchronize,
          logging: false,
        };
      },
    }),
    UsersModule,
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
