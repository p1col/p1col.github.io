import * as dd from 'dingtalk-jsapi';
import * as ww from '@wecom/jssdk';
import { isWxWork, isDingTalk, isFeishu, loadScript } from '../utils/index';

let isloaded = false;

export function feishuApi() {
  return new Promise((resolve, reject) => {
    console.log('start apiAuth');
    // 初次加载
    // @ts-ignore
    if (!window.h5sdk && isFeishu() && !isloaded) {
      isloaded = true;
      console.info('插播飞书sdk');
      const sdkUrl =
        'https://lf1-cdn-tos.bytegoofy.com/goofy/ee/lark/h5jssdk/lark/js_sdk/h5-js-sdk-1.5.11.js';
      loadScript(sdkUrl, async () => {
        console.info('飞书sdk加载完成');
        try {
          const res = await feishuApi();
          console.info('飞书sdk加载完成后的结果', res);
          res && resolve(res);
        } catch (error) {
          reject(error);
        }
      });
      return;
    }
    // @ts-ignore
    if (!window.h5sdk) {
      console.log('invalid h5sdk');
      console.log('请在飞书内打开');
      return;
    }

    // 调用config接口的当前网页url
    const url = encodeURIComponent(location.href.split('#')[0]);
    console.log('接入方前端将需要鉴权的url发给接入方服务端,url为:', url);
    // 向接入方服务端发起请求，获取鉴权参数（appId、timestamp、nonceStr、signature）
    fetch(`/get_config_parameters?url=${url}`)
      .then((response) =>
        response.json().then((res) => {
          console.log('接入方服务端返回给接入方前端的结果(前端调用config接口的所需参数):', res);
          // 通过error接口处理API验证失败后的回调
          // @ts-ignore
          window.h5sdk.error((err) => {
            console.log(err);
            reject(JSON.stringify(err));
          });
          // 调用config接口进行鉴权
          // @ts-ignore
          window.h5sdk.config({
            appId: res.appid,
            timestamp: res.timestamp,
            nonceStr: res.noncestr,
            signature: res.signature,
            jsApiList: [],
            //鉴权成功回调
            onSuccess: (res: any) => {
              console.log(`config success: ${JSON.stringify(res)}`);
            },
            //鉴权失败回调
            onFail: (err: any) => {
              reject(`config failed: ${JSON.stringify(err)}`);
            },
          });
          // 完成鉴权后，便可在 window.h5sdk.ready 里调用 JSAPI
          // @ts-ignore
          window.h5sdk.ready(() => {
            // @ts-ignore
            tt.scanCode({
              scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
              barCodeInput: true,
              success(res: any) {
                console.log('扫码结果', JSON.stringify(res));
                resolve({ result: res.result });
                // return { result: res.result, errMsg: res.errMsg };
              },
              fail(err: any) {
                console.log(`scanCode fail: ${JSON.stringify(err)}`);
                reject(JSON.stringify(err));
              },
              complete(res: any) {
                console.log('scanCode 调用结束', res.errMsg);
              },
            });
          });
        })
      )
      .catch(function (e) {
        console.error(e);
        reject(e);
      });
  });
}

function ddApi() {
  dd.scan({
    type: 'qr',
    // @ts-ignore
    success: (res) => {
      const { code } = res;
      console.log('扫码内容', code);
    },
    fail: (err: any) => {
      console.log('fail', err);
    },
    complete: (res: any) => {
      console.log('complete', res);
    },
  });
}

export const loadSdk = () => {
  if (isFeishu()) {
    feishuApi();
  } else if (isWxWork()) {
    // @ts-ignore
    ww.scanQRCode({
      scanType: [ww.ScanQRCodeType.qrCode],
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {
        console.log(res);
      },
    });
  } else if (isDingTalk()) {
    ddApi();
  }
};
