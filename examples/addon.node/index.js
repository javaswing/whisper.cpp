const path = require("path");
const addon = require(path.join(
  __dirname,
  "../../build/Release/whisper-addon"
));
// const { promisify } = require("util");

// const whisperAsync = promisify(whisper);

const params = {
  language: "en",
  model: path.join(__dirname, "../../models/ggml-base.en.bin"),
  fname_inp: "../../samples/movie.wav",
};

// Define the whisper_callbacks object with optional callbacks
const callbacks = {
  segmentCallback: (t0, t1, text) => {
    console.log('segmentCallback');
    // This callback will receive real-time segment output
    console.log(`[${t0} --> ${t1}] ${text}`);
  },
  progressCallback: (progress) => {
    console.log('Progress');
    // This callback will receive task progress (a float value between 0 and 1)
    console.log(`Progress: ${(progress * 100).toFixed(2)}%`);
  },
  abortCallback: () => {
    // This callback can be used to control the worker's abortion.
    // For simplicity, we won't abort in this example, so always return false.
    return false;
  },
};

// const arguments = process.argv.slice(2);
// const params = Object.fromEntries(
//   arguments.reduce((pre, item) => {
//     if (item.startsWith("--")) {
//       return [...pre, item.slice(2).split("=")];
//     }
//     return pre;
//   }, [])
// );

// for (const key in params) {
//   if (whisperParams.hasOwnProperty(key)) {
//     whisperParams[key] = params[key];
//   }
// }

// console.log("whisperParams =", whisperParams);

// whisperAsync(whisperParams).then((result) => {
//   console.log(`Result from whisper: ${result}`);
// });



// 启动whisper函数运行
const runningProcess = addon.whisper(params, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

// 在某个时间点调用whisper_abort方法来取消运行
setTimeout(() => {
  addon.abort();
}, 5000);