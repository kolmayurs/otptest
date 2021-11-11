import styled from 'styled-components'

export const OTPVerificationContainer = styled.div`
	background: ${({ theme }) => theme.WHITE};
	@media ${({ theme }) => theme.tabletMin} {
		height: 100%;
		padding: 80px 0 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
`
export const OTPHeaderContainer = styled.div`
	padding: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.GREY_4};
	text-align: left;
	position: relative;
	height: 100%;
	@media ${({ theme }) => theme.tabletMin} {
		width: 328px;
		height: auto;
	}
`
export const OTPHeaderText = styled.h3`
	${({ theme }) => theme['subtitle-large']}
	margin-bottom: 2px;
`
export const OTPSubtitle = styled.p`
	${({ theme }) => theme['body-small']}
`
export const OTPInputContainer = styled.div`
	padding: 22px 16px 16px 16px;
	height: 160px;
`
export const OTPInputWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	max-width: 328px;
`
export const OTPInputBox = styled.input`
	all: unset;
	height: 36px;
	width: 36px;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.GREY_3};
	text-align: center;
	transition: all 0.3s ease-in-out;
	&:focus {
		border: 1px solid ${({ theme }) => theme.BMS_RED_1};
	}
	&:not(:first-child) {
		margin-left: 16px;
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
`
export const OTPFooterContainer = styled.div`
	padding: 8px 16px;
	width: 100%;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.16);
	@media ${({ theme }) => theme.tabletMin} {
		background: ${({ theme }) => theme.WHITE};
		bottom: -56px;
	}
`
export const RetryText = styled.p`
	${({ theme }) => theme['body-small']}
	color: ${({ theme }) => theme.GREY_1};
`
export const InputError = styled.div`
	${({ theme }) => theme['body-small']};
	color: ${({ theme }) => theme.ERROR_1};
	width: 328px;
	text-align: left;
	padding: 10px 0px;
`
export const Span = styled.span`
	display: inline-block;
`
