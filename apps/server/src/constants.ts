export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const MONTH = DAY * 30;

export enum ENV {
  JWT_SECRET = 'JWT_SECRET',
  MONGO_URI = 'MONGO_URI',
  DOMAIN = 'DOMAIN',
}
