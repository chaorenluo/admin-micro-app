export abstract class Command<TOptions = ISafeAny> {
  protected options: TOptions;

  constructor(options: TOptions) {
    this.options = options;
  }

  abstract execute(): Promise<void>;
}
