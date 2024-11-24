import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { TariffModule } from './tariff/tariff.module';
import { PickupLocationModule } from './pickup-location/pickup-location.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: +config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      migrations: [`${__dirname}/**/migrations/*.js`],
      migrationsRun: true,
      synchronize: true,
      logging: true,

    }),
    AuthModule,
    UserModule,
    NewsModule,
    TariffModule,
    PickupLocationModule
  ], 

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
