import ports from '@shared/tsconfig/ports.json';
import { envUtils } from './env';

export namespace MicroUtils {
  export function getAppUrl(appName: IAppName) {
    // @ts-ignore
    const microName = import.meta.env.MicroBaseUrl[appName];
    let url: string;
    if (envUtils.isDev()) {
      url = `http://localhost:${getAppPort(appName)}${microName}`;
    } else {
      url = `${location.origin}${microName}`;
    }

    return url;
  }

  export function getMicroPreFetch() {
    if (envUtils.isDev()) {
      return [];
    }
    return [{
      name: 'micro-child',
      url: getAppUrl('@micro/child'),
      level: 2,
      iframe: true
    }, {
      name: 'micro-abtest',
      url: getAppUrl('@micro/abtest'),
      level: 2,
      iframe: true
    }];
  }

  export function openMicroApp(appName: IAppName) {
    window.open(getAppUrl(appName));
  }

  export function getAppPort(appName: IAppName) {
    // @ts-ignore
    return ports[appName];
  }
}
