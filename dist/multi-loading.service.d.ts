import { LoadingController } from 'ionic-angular';
export declare class MultiLoadingService {
    private loadingCtrl;
    static timerDuration: number;
    static defaultMessage: string;
    private keys;
    private timer;
    private loader;
    private messagesByKey;
    constructor(loadingCtrl: LoadingController);
    startLoading(key: string, message?: string): void;
    stopLoading(key: string): void;
    stopAllLoading(): void;
    private clearTimer();
    private openLoading(message?);
    private closeLoading(closeNow?);
    private addKey(key);
    private removeKey(key);
    private hasKey(key);
}
