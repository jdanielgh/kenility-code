import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './insfrastructure/database/database.module';
import { AuthModule } from './insfrastructure/auth/auth.module';
import { ProductModule } from './application/product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule]
})
export class AppModule {}
