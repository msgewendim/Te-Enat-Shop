// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module 'i18next-http-backend' {
  import { BackendModule, ReadCallback } from 'i18next';
  
  export interface BackendOptions {
    loadPath?: string;
    addPath?: string;
    allowMultiLoading?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parse?(data: string): any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stringify?(data: any): string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request?(options: any, url: string, payload: any, callback: any): void;
    reloadInterval?: false | number;
    customHeaders?: Record<string, string>;
    queryStringParams?: Record<string, string>;
    crossDomain?: boolean;
    withCredentials?: boolean;
    overrideMimeType?: boolean;
  }
  
  export default class Backend implements BackendModule<BackendOptions> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(services?: any, options?: BackendOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(services: any, options?: BackendOptions): void;
    read(language: string, namespace: string, callback: ReadCallback): void;
    create?(languages: string[], namespace: string, key: string, fallbackValue: string): void;
    type: 'backend';
    static type: 'backend';
  }
} 