import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import SubjectRepository from './repositories/subjects.repository';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), ChallengesModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectRepository],
  exports: [SubjectsService, SubjectRepository],
})
export class SubjectsModule {}
