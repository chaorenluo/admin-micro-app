export namespace envUtils {
  export function isDev() {
    // @ts-ignore
    return process.env.NODE_ENV === 'dev';
  }

  export function isProduction() {
    return !isDev();
  }
  export function isTest() {
    console.log('dfff.env.NODE_ENV');
  }
}
