export type IUseCase<R = void> = {
    execute(...args: any[]): Promise<R>;
  };