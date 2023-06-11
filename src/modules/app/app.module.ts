import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOCAL_ENV } from 'src/commons/constants/variables.constants';
import JwtAccessStrategy from 'src/commons/guards/strategies/jwtAccess.strategy';
import { OPTION_DOCKER, OPTION_LOCAL, RedisConfig } from 'src/configs';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/auth.module';
import { ExamsModule } from '../v1/exams/exams.module';
import { QuestionsModule } from '../v1/questions/questions.module';
import { SubjectsModule } from '../v1/subjects/subjects.module';
import { UsersModule } from '../v1/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamQuestion } from '../v1/exam-questions/entities/exam-question.entity';
import { ExamQuestionsModule } from '../v1/exam-questions/exam-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === LOCAL_ENV ? OPTION_LOCAL : OPTION_DOCKER
    ),
    BullModule.forRoot({
      redis: RedisConfig,
    }),
    AuthModule,
    UsersModule,
    ExamsModule,
    QuestionsModule,
    SubjectsModule,
    ExamQuestion,
    ExamQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAccessStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddleWare).forRoutes('*');
  }
}
