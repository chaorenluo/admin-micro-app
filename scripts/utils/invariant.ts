import invariantImpl from 'invariant';

export namespace invariantUtils {
  export const invariant = invariantImpl;

  export function define<T>(value: T): asserts value {
    invariantImpl(value, `Expect value to be define.`);
  }
}
