import React from 'react'
import { node, number, func, bool } from 'prop-types'
import ResendTimer from './ResendTimer'
import { OTPFooterContainer } from './style'

const OTPFooter = ({ canResend, resendTimeout, resendOTP, otpVal, otpLength, ValidateOTPLoading, sendOTP }) => (
	<OTPFooterContainer>
		{canResend && (
			<ResendTimer
				timer={resendTimeout / 1000}
				timerInterval={1000}
				text='Resend in'
				helperText='sec'
				retryAttempts={3}
				retryComponent='Retry'
				onRetry={resendOTP}
			/>
		)}
	</OTPFooterContainer>
)

OTPFooter.defaultProps = {
	canResend: false,
	resendTimeout: 10000,
	resendOTP: () => {},
	otpVal: '',
	otpLength: 6,
	ValidateOTPLoading: false,
	sendOTP: () => {},
}

OTPFooter.propTypes = {
	canResend: bool,
	resendTimeout: number,
	resendOTP: func,
	otpVal: node,
	otpLength: number,
	ValidateOTPLoading: bool,
	sendOTP: func,
}

export default OTPFooter
