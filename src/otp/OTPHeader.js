import React from 'react'
import { string } from 'prop-types'
import { OTPHeaderContainer, OTPHeaderText, OTPSubtitle } from './style'

const OTPHeader = ({ headerText, subTitle }) => (
	<OTPHeaderContainer>
		{headerText && <OTPHeaderText>{headerText}</OTPHeaderText>}
		{subTitle && <OTPSubtitle>{subTitle}</OTPSubtitle>}
	</OTPHeaderContainer>
)

OTPHeader.defaultProps = {
	headerText: '',
	subTitle: '',
}

OTPHeader.propTypes = {
	headerText: string,
	subTitle: string,
}

export default OTPHeader
