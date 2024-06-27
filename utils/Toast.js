import Toast from "react-native-root-toast";


export const showToast = (text, long) => {

let toast = Toast.show(text, {
    duration: long ? Toast.durations.LONG : Toast.durations.SHORT,
  });
  
     // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    // setTimeout(function hideToast() {
    //     Toast.hide(toast);
    // }, 500);

}