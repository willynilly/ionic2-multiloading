import { Injectable } from '@angular/core';
import { LoadingController, Loading, LoadingOptions } from 'ionic-angular';

@Injectable()
export class MultiLoadingService {
    static timerDuration = 200; // ms
    static defaultMessage = 'Loading';

    private keys: string[] = [];
    private timer: any = null;
    private loader: Loading = null;
    private messagesByKey: any = {};

    constructor(private loadingCtrl: LoadingController) {

    }

    startLoading(key: string, message: string = MultiLoadingService.defaultMessage) {
        if (!this.hasKey(key)) {
            this.messagesByKey[key] = message;
            this.addKey(key);
            this.clearTimer();
            if (this.loader === null) {
                this.openLoading(message);
            }
        }
    }

    stopLoading(key: string) {
        if (this.hasKey(key)) {
            this.removeKey(key);
            if (this.keys.length === 0) {
                this.closeLoading();
            } else {
                if (this.loader !== null) {
                    let nextKey: string = this.keys[0];
                    let message: string = this.messagesByKey[nextKey];
                    this.loader.setContent(message);
                }
            }
        }
    }

    stopAllLoading() {
        this.closeLoading(true);
    }

    private clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    }

    private openLoading(message: string = MultiLoadingService.defaultMessage): void {
        let options: LoadingOptions = {
            content: message
        };
        this.loader = this.loadingCtrl.create(options);
        this.loader.present();
    }

    private closeLoading(closeNow: boolean = false): void {
        if (this.loader !== null && this.loader !== undefined) {
            let handleClose = (): void => {
                this.loader.dismiss();
                this.loader = null;
                this.keys = [];
                this.messagesByKey = {};
            };
            if (closeNow) {
                handleClose();
            } else {
                this.timer = setTimeout(() => {
                    handleClose();
                }, MultiLoadingService.timerDuration);
            }
        }
    }

    private addKey(key: string): void {
        this.keys.push(key);
    }

    private removeKey(key: string): void {
        let keyIndex = this.keys.indexOf(key);
        if (keyIndex !== -1) {
            this.keys.splice(keyIndex, 1);
        }
    }

    private hasKey(key: string): boolean {
        return this.keys.indexOf(key) !== -1;
    }

}