/// <reference types="node" />
export interface AppConfigHttp {
  NODE_ENV: string;
  APPLICATION_URL: string;
}
export declare type AppConfig = AppConfigHttp;
export declare const getServiceConfig: (
  environment?: NodeJS.ProcessEnv
) => AppConfigHttp;
//# sourceMappingURL=getServiceConfig.d.ts.map
