import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Composition, CompositionSchema } from './composition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Composition.name, schema: CompositionSchema },
    ]),
  ],
  controllers: [CompositionController],
  providers: [CompositionService],
})
export class CompositionModule {}
