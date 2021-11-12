import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { string, number } from "prop-types";
import OTPHeader from "./OTPHeader";
import OTPContainer from "./OTPContainer";
import OTPFooter from "./OTPFooter";
import { OTPVerificationContainer } from "./style";
import { useOTPChange } from "./CommonCustomHooks";

const OTPVerification = ({ inputType, autoFocusIndex }) => {
  const [otpError, setOTPError] = useState("");
  const otpLength = 6;
  const resendTimeout = 120000;
  const canResend = true;
  const inputNumArr = useRef(new Array(otpLength).fill(otpLength));
  const { otpVal, setOtpVal, inputBoxRefs, handleOtpChange, handleKeyDown } =
    useOTPChange(otpLength, setOTPError);

  const fillOTP = (otp) => {
    const reqOTP = otp.substring(0, otpLength);
    if (reqOTP) {
      const filledOTP = reqOTP.split("").map((val) => val);
      setOtpVal(filledOTP);
    }
  };

  if ('OTPCredential' in window) {
    window.addEventListener('DOMContentLoaded', e => {
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      console.log(1)
      if (!input) return;
      const ac = new AbortController();
      const form = input.closest('form');
      console.log(2)
      if (form) {
        form.addEventListener('submit', e => {
          ac.abort();
        });
      }
      navigator.credentials.get({
        otp: { transport:['sms'] },
        signal: ac.signal
      }).then(otp => {
        console.log(3)
        input.value = otp.code;
        if (form) form.submit();
      }).catch(err => {
        console.log(err);
      });
    });
  }

  return (
    <React.Fragment>
      <OTPVerificationContainer>
        <OTPHeader
          headerText="OTP Verification"
          subTitle="OTP sent to 9920176209"
        />
        <form>
          <input autocomplete="one-time-code" required />
          <input type="submit" />
        </form>
        <OTPContainer
          inputType={inputType}
          autoFocusIndex={autoFocusIndex}
          inputNumArr={inputNumArr}
          otpVal={otpVal}
          handleOtpChange={handleOtpChange}
          inputBoxRefs={inputBoxRefs}
          handleKeyDown={handleKeyDown}
          otpError={otpError}
        />
        <OTPFooter
          canResend={canResend}
          resendTimeout={resendTimeout}
          otpVal={otpVal}
          otpLength={otpLength}
        />
      </OTPVerificationContainer>
    </React.Fragment>
  );
};

OTPVerification.defaultProps = {
  inputType: "number",
  autoFocusIndex: 0,
};

OTPVerification.propTypes = {
  inputType: string,
  autoFocusIndex: number,
};

export default OTPVerification;
