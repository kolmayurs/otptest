import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { string, number } from "prop-types";
import OTPHeader from "./OTPHeader";
import OTPContainer from "./OTPContainer";
import OTPFooter from "./OTPFooter";
import { OTPVerificationContainer } from "./style";
import { useOTPChange, autoReadSMS } from "./CommonCustomHooks";

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

  useEffect(()=>{
    autoReadSMS(fillOTP)
  },[])

  return (
    <React.Fragment>
      <OTPVerificationContainer>
        <OTPHeader
          headerText="OTP Verification"
          subTitle="OTP sent to 9920176209"
        />
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
