import { useState, useRef } from "react";

export const useOTPChange = (otpLength, setOTPError) => {
  const [otpVal, setOtpVal] = useState([]);
  const inputBoxRefs = useRef([]);

  const handleOtpChange = (index) => (e) => {
    setOTPError("");
    const { target } = e;
    const { value } = target;
    const otpValClone = [...otpVal];
    if (value.length > 1) {
      const copiedOTP = value.substring(0, otpLength);
      for (let initVal = index; initVal < copiedOTP.length; initVal++) {
        otpValClone[initVal] = copiedOTP[initVal];
      }
      setOtpVal(otpValClone);
      inputBoxRefs.current[copiedOTP.length - 1].focus();
    } else {
      const val = value.substring(0, 1);
      otpValClone[index] = val;
      setOtpVal(otpValClone);
      if (val && index + 1 < otpLength) {
        return inputBoxRefs.current[index + 1].focus();
      }
    }
    return null;
  };

  const handleKeyDown = (index) => (e) => {
    if (e.keyCode === 8 && index > 0) {
      if (!otpVal[index] && inputBoxRefs.current.length > 0) {
        inputBoxRefs.current[index - 1].focus();
      }
    }
  };

  return { otpVal, setOtpVal, inputBoxRefs, handleOtpChange, handleKeyDown };
};

export const useUpdateProgress = () => {
  const [loadProgress, setLoadProgress] = useState(0);
  const updateProgress = (progress) => setLoadProgress(progress);

  return { loadProgress, setLoadProgress, updateProgress };
};

export function autoReadSMS(cb) {
  // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
   const signal = new AbortController();
   setTimeout(() => {
     signal.abort();
   }, 1 * 60 * 2000);
   async function main() {
     if ('OTPCredential' in window) {
        try {
           if (navigator.credentials) {
              try {
                 await navigator.credentials
                 .get({ abort: signal, otp:{ transport: ['sms']}})
                 .then(content => {
                   if (content && content.code) {
                     cb(content.code);
                   }
                 })
                 .catch(e => console.log(e));
              } 
              catch (e) {
                return;
              }
           }
        } 
        catch (err) {
          console.log(err);
        }
      }
   }
   main();
  }