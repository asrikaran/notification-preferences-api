//notification-preferences-api/src/utils/logger.ts

export const logger = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};