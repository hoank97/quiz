import { Injectable } from '@nestjs/common';
import { ChallengesService } from '../../challenges/challenges.service';
import { CreateExamQuestionDto } from '../../exam-questions/dto/create-exam-question.dto';
import { ExamQuestionsService } from '../../exam-questions/services/exam-questions.service';
import { QuestionsService } from '../../questions/questions.service';
import ExamRepository from '../repositories/exams.repository';
import { SubmitExamDto } from '../dto/submit.dto';
import { IExam, IExamSubmit, IHistoryExam } from '../interfaces';
import { convertArrToDict } from 'src/commons';
import { QUESTION_STATUS } from '../../exam-questions/constants';
import { UpdateExamQuestionDto } from '../../exam-questions/dto/update-exam-question.dto';
import { EXAM_STATUS } from '../constants';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ExamsService {
  constructor(
    private readonly challengeService: ChallengesService,
    private readonly questionService: QuestionsService,
    private readonly examQuestionService: ExamQuestionsService,
    private readonly examRepository: ExamRepository
  ) {}
  async takeExam(challengeId: number, userId: number): Promise<IExam> {
    const challengeInfo = (
      await this.challengeService.findOneByConditions(
        {
          id: challengeId,
        },
        false
      )
    ).data;
    const questionList = await this.questionService.getRandomActiveQuestions(
      challengeInfo.number_of_questions,
      challengeInfo.subject_id
    );
    // Save to exam
    const createExam = await this.examRepository.create(
      challengeInfo.id,
      userId
    );
    for (const question of questionList) {
      // Save to exam question
      const body: CreateExamQuestionDto = {
        examId: createExam.id,
        questionId: question.id,
        content: question.content,
        answers: question.answer,
      };
      await this.examQuestionService.create(body);
      // Remove correct answers of questions

      question.answer.map((answer) => delete answer.correct);
    }

    return {
      id: createExam.id,
      questions: questionList,
      duration: challengeInfo.duration,
    };
  }

  async submitExam(data: SubmitExamDto) {
    const examDetail = await this.getExamDetail(data.examId);
    const challengeInfo = await this.examRepository.getChallengeInfoByExamId(
      data.examId
    );

    const examsDict = convertArrToDict(examDetail, 'question_id');
    const userAnswerDict = convertArrToDict(data.question, 'id');
    const promises = [];
    let score = 0;

    for (const question of examDetail) {
      let status = QUESTION_STATUS.WRONG;
      const examResult = JSON.stringify(
        examsDict[question.question_id].answers
      );
      const userAnswer = JSON.stringify(
        userAnswerDict[question.question_id].answer
      );
      if (examResult === userAnswer) {
        score++;
        status = QUESTION_STATUS.CORRECT;
      }

      // Save user answer to database
      const body: UpdateExamQuestionDto = {
        id: question.id,
        user_answered: userAnswerDict[question.question_id].answer,
        status,
      };
      const submitExamQuestionPromise =
        this.examQuestionService.submitExamQuestion(body);
      promises.push(submitExamQuestionPromise);
    }
    Promise.all(promises);
    // Save data to exams
    const result: IExamSubmit = {
      id: data.examId,
      spendTime: data.spendTime,
      score,
      status:
        score > challengeInfo.challenge.passing_score
          ? EXAM_STATUS.PASSED
          : EXAM_STATUS.FAILED,
    };

    await this.updateExam(result);
    return result;
  }

  async getExamDetail(examId: number) {
    return this.examQuestionService.getExamDetail(examId);
  }

  async updateExam(data: IExamSubmit): Promise<UpdateResult> {
    return this.examRepository.update(data);
  }

  async getListExamByUserId(userId: number) {
    return this.examRepository.getListExamByUserId(userId);
  }

  async getExamResult(examId: number, userId: number): Promise<IHistoryExam> {
    const examResult = await this.examRepository.getExamResult(examId, userId);
    if (!examResult) {
      return {} as IHistoryExam;
    }
    const questionDetail = await this.examQuestionService.getExamDetail(examId);
    const body: IHistoryExam = {
      score: examResult.score,
      spendTime: examResult.spend_time,
      status: examResult.status,
      passingScore: examResult.challenge.passing_score,
      numberOfQuestions: examResult.challenge.number_of_questions,
      duration: examResult.challenge.duration,
      questions: questionDetail,
    };

    return body;
  }
}
