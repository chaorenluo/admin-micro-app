import { EAppDevSocketType } from 'scripts/types';
import { pathUtils } from 'scripts/utils/paths';

import { invariantUtils } from '../../../utils/invariant';
import { ProjectFactory } from '../../factories/project';

import type { Project } from '../../project/project';
import { Plugin, createLogger, ViteDevServer, WebSocket } from 'vite';

class AppMap extends Map<IAppName, Project> {
  getRunningAppNames() {
    return Array.from(this.keys()).filter((name) => this.get(name)?.isServing);
  }
}

const setupNewSocket = (server: ViteDevServer, socket: WebSocket, appMap: AppMap) => {
  socket.on('message', async(buffer) => {
    const logger = createLogger('info');
    const rawData = JSON.parse(buffer.toString());
    if (!rawData.event) return;
    const { type, data } = rawData.event;
    logger.info(`receive: type - ${type}, data - ${data}`);

    const logRunningApps = () => {
      const runningApps = appMap.getRunningAppNames();
      if (runningApps.length > 0) {
        logger.info(`当前正在运行的微应用： ${appMap.getRunningAppNames().join('、')}`);
      } else {
        logger.info(`当前没有正在运行的微应用`);
      }
    };

    switch (type) {
      case EAppDevSocketType.StartApp: {
        const appName = data as IAppName;
        if (appMap.has(appName)) {
          logRunningApps();
          server.ws.send(EAppDevSocketType.AppStarted, { data: appName });
          return;
        }

        appMap.set(appName, ProjectFactory.create(undefined, pathUtils.getAppProjectDir(appName)));
        const appProject = appMap.get(appName)!;
        await appProject.serve();
        server.ws.send(EAppDevSocketType.AppStarted, { data: appName });
        logRunningApps();
        break;
      }
      case EAppDevSocketType.CloseApp: {
        const appName = data as IAppName;
        const appProject = appMap.get(appName);
        invariantUtils.define(appProject);
        await appProject.stopServe();
        logRunningApps();
        server.ws.send(EAppDevSocketType.AppClosed, { data: appName });
        break;
      }
    }
  });
};

export const SetupMiddlewares = (): Plugin => {
  return {
    name: 'configure-server-setupMiddlewares',
    configureServer(server) {
      invariantUtils.define(server.httpServer);
      const appMap = new AppMap();
      server.ws.on('connection', (socket, req) => {
        invariantUtils.define(socket);
        setupNewSocket(server, socket, appMap);
      });
    }
  };
};
