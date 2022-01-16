import {createLogger,
    format,
    transports,
  } from 'winston';
import dotenv from 'dotenv';
import  {join} from 'path';

dotenv.config({
    path:join(process.cwd(), '../../../.env')
})

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.cli(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: './logs/all.log',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
  ]
});


export const logInfo = (message: string) => {
  logger.log('info', message)
}

export const logError = (message: string) => {
  logger.log('error', message)
}
