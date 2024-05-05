import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './insfrastructure/database/database.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule]
})
export class AppModule {}
