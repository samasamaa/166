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
import { SitesettingsModule } from './sitesettings/sitesettings.module';
import { CargoModule } from './cargo/cargo.module';
import { ClsModule } from 'nestjs-cls';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


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
      autoLoadEntities: true
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true }, 
    }),ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '../uploads'),
    }),
    AuthModule,
    UserModule,
    NewsModule,
    TariffModule,
    PickupLocationModule,
    SitesettingsModule,
    CargoModule,
    UploadModule
  ], 

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
