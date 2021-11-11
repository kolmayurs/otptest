import React, { useRef } from 'react'
import { string, number, func, shape, node, bool } from 'prop-types'
import { OTPInputContainer, OTPInputBox, InputError, OTPInputWrapper } from './style'

const OTPContainer = ({
	inputType,
	autoFocusIndex,
	inputNumArr,
	otpVal,
	handleOtpChange,
	inputBoxRefs,
	handleKeyDown,
	isDisable,
	otpError,
}) => {
	const inputBoxRef = useRef(inputBoxRefs.current)
	return (
		<OTPInputContainer>
			<OTPInputWrapper>
				{inputNumArr.current.map((numInput, index) => {
					return (
						<OTPInputBox
							key={`${numInput}_${index}`}
							type={inputType}
							value={otpVal[index] || ''}
							onChange={handleOtpChange(index)}
							autoFocus={autoFocusIndex === index}
							ref={(ref) => {
								inputBoxRef.current[index] = ref
							}}
							onKeyDown={handleKeyDown(index)}
							disabled={isDisable ? 'disabled' : ''}
						/>
					)
				})}
			</OTPInputWrapper>
			{otpError && <InputError>{otpError}</InputError>}
		</OTPInputContainer>
	)
}

OTPContainer.defaultProps = {
	inputType: 'number',
	autoFocusIndex: 0,
	inputNumArr: [],
	otpVal: [],
	handleOtpChange: () => {},
	inputBoxRefs: [],
	handleKeyDown: () => {},
	isDisable: false,
	otpError: '',
}

OTPContainer.propTypes = {
	inputType: string,
	autoFocusIndex: number,
	inputNumArr: shape([]),
	otpVal: node,
	handleOtpChange: func,
	inputBoxRefs: shape([]),
	handleKeyDown: func,
	isDisable: bool,
	otpError: string,
}

export default OTPContainer
