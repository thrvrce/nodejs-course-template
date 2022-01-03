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
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: 'all.log',
      level: 'silly',
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
