import * as dd from 'dingtalk-jsapi';
import * as ww from '@wecom/jssdk';
import { isWxWork, isDingTalk, isFeishu } from '../utils/index';

function feishuApi() {
  console.log('start apiAuth');
  // @ts-ignore
  if (!window.h5sdk) {
    console.log('invalid h5sdk');
    alert('please open in feishu');
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
            throw `config failed: ${JSON.stringify(err)}`;
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
              console.log('scanCode', JSON.stringify(res));
            },
            fail(res: any) {
              console.log(`scanCode fail: ${JSON.stringify(res)}`);
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
