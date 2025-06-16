import microApp, { getActiveApps } from "@micro-zoe/micro-app";

const send = async(app_name: string, data: any) => {
  if (!getActiveApps().includes(appName)) {
    console.log("活动中app,", getActiveApps(), "当前appName:", appName);
  }
  const res = await microApp.sendData(data);
  return res;
};

const useSendData = () => {
  return {
    send
  };
};
