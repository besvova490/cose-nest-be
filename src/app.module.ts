import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';

// modules
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ProfileModule } from './api/profile/profile.module';
import { EventStoreModule } from './api/event-store/event-store.module';
// import { MongoModule } from './config/database/mongo.config';

// models
// import { Event, EventSchema } from './api/event-store/schemas/event.schema';

// services
// import { EventStoreService } from './api/event-store/event-store.service';

// middlewares
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

// helpers
import { databaseConfig } from './config/database/postgres.config';
import { mongoConfig } from './config/database/mongo.config';
import { API_ENDPOINTS } from './constants';
import { DocumentModule } from './api/document/document.module';
import { ServiceModule } from './api/service/service.module';
import { OrdersModule } from './api/orders/orders.module';
import { ReviewModule } from './api/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: () => databaseConfig as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forRootAsync({
      name: 'mongo',
      useFactory: () => mongoConfig as TypeOrmModuleOptions,
    }),
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
          {
            path: API_ENDPOINTS.SERVICES,
            module: ServiceModule,
          },
          {
            path: API_ENDPOINTS.ORDERS,
            module: OrdersModule,
          },
        ],
      },
    ]),
    UserModule,
    AuthModule,
    ProfileModule,
    EventStoreModule,
    DocumentModule,
    ServiceModule,
    OrdersModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
