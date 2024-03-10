import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

// modules
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ProfileModule } from './api/profile/profile.module';
import { EventStoreModule } from './api/event-store/event-store.module';

// models
import { Event, EventSchema } from './api/event-store/schemas/event.schema';

// services
import { EventStoreService } from './api/event-store/event-store.service';

// middlewares
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

// helpers
import { databaseConfig } from './config/database/database.config';
import { API_ENDPOINTS } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig as TypeOrmModuleOptions,
    }),
    MongooseModule.forRoot(process.env.NEST_MONGO_URL),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    RouterModule.register([
      {
        path: API_ENDPOINTS.BASE,
        module: AppModule,
        children: [
          {
            path: API_ENDPOINTS.AUTH,
            module: AuthModule,
          },
          {
            path: API_ENDPOINTS.PROFILE,
            module: ProfileModule,
          },
          {
            path: API_ENDPOINTS.EVENT_STORE,
            module: EventStoreModule,
          },
        ],
      },
    ]),
    UserModule,
    AuthModule,
    ProfileModule,
    EventStoreModule,
  ],
  controllers: [],
  providers: [EventStoreService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
