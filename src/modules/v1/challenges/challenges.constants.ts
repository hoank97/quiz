export enum LEVEL {
  LOW = 1,
  HIGH = 2,
}

export enum TYPE {
  COMPETITIVE = 1,
  PRACTICE = 2,
}

export const DEFAULT = {
  number_of_questions: 20,
  type: TYPE.PRACTICE,
  duration: 1200, //second
  passing_score: 18, // correct more than 18/20 question will be passed the challenge
  security_level: LEVEL.LOW,
  name: 'practice',
  max_retries: 100,
};
