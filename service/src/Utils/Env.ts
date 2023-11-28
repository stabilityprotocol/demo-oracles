export const env = (variable: string, fallback?: any) => {
    if (process.env[variable]) return process.env[variable]! as string;
    if (fallback) return fallback;
    throw new Error(`Environment variable ${variable} is not defined`);
  };