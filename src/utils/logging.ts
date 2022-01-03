import {createLogger,
    format,
    transports,
  } from 'winston';

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    format.cli(),
  ),
  transports: [
    new transports.Console(),
  ]
});


export const logInfo = (message: string) => {
  logger.log('info', message)
}

export const logError = (message: string) => {
  logger.log('error', message)
}
