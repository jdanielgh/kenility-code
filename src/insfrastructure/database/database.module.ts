import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const MONGODB_URL = process.env.MONGODB_URL ?? 'mongodb://mongodb:27017/store';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL)]
})
export class DatabaseModule {}
