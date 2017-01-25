var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
var MultiLoadingService = MultiLoadingService_1 = (function () {
    function MultiLoadingService(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.keys = [];
        this.timer = null;
        this.loader = null;
        this.messagesByKey = {};
    }
    MultiLoadingService.prototype.startLoading = function (key, message) {
        if (message === void 0) { message = MultiLoadingService_1.defaultMessage; }
        if (!this.hasKey(key)) {
            this.messagesByKey[key] = message;
            this.addKey(key);
            this.clearTimer();
            if (this.loader === null) {
                this.openLoading(message);
            }
        }
    };
    MultiLoadingService.prototype.stopLoading = function (key) {
        if (this.hasKey(key)) {
            this.removeKey(key);
            if (this.keys.length === 0) {
                this.closeLoading();
            }
            else {
                if (this.loader !== null) {
                    var nextKey = this.keys[0];
                    var message = this.messagesByKey[nextKey];
                    this.loader.setContent(message);
                }
            }
        }
    };
    MultiLoadingService.prototype.stopAllLoading = function () {
        this.closeLoading(true);
    };
    MultiLoadingService.prototype.clearTimer = function () {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    };
    MultiLoadingService.prototype.openLoading = function (message) {
        if (message === void 0) { message = MultiLoadingService_1.defaultMessage; }
        var options = {
            content: message
        };
        this.loader = this.loadingCtrl.create(options);
        this.loader.present();
    };
    MultiLoadingService.prototype.closeLoading = function (closeNow) {
        var _this = this;
        if (closeNow === void 0) { closeNow = false; }
        if (this.loader !== null && this.loader !== undefined) {
            var handleClose_1 = function () {
                _this.loader.dismiss();
                _this.loader = null;
                _this.keys = [];
                _this.messagesByKey = {};
            };
            if (closeNow) {
                handleClose_1();
            }
            else {
                this.timer = setTimeout(function () {
                    handleClose_1();
                }, MultiLoadingService_1.timerDuration);
            }
        }
    };
    MultiLoadingService.prototype.addKey = function (key) {
        this.keys.push(key);
    };
    MultiLoadingService.prototype.removeKey = function (key) {
        var keyIndex = this.keys.indexOf(key);
        if (keyIndex !== -1) {
            this.keys.splice(keyIndex, 1);
        }
    };
    MultiLoadingService.prototype.hasKey = function (key) {
        return this.keys.indexOf(key) !== -1;
    };
    return MultiLoadingService;
}());
MultiLoadingService.timerDuration = 200; // ms
MultiLoadingService.defaultMessage = 'Loading';
MultiLoadingService = MultiLoadingService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoadingController])
], MultiLoadingService);
export { MultiLoadingService };
var MultiLoadingService_1;
//# sourceMappingURL=multi-loading.service.js.map