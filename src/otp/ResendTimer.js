import React, { useEffect, useState, useRef } from 'react'
import { string, number, func } from 'prop-types'
import { RetryText, Span } from './style'

const ResendTimer = ({
	timer,
	timerInterval,
	text,
	helperText,
	retryAttempts,
	retryComponent,
	onRetryFinished,
	onTimerFinish,
	onRetry,
}) => {
	const [timerVal, setTimerVal] = useState(timer)
	const pendingRetries = useRef(retryAttempts > 0 ? retryAttempts - 1 : 0)
	const timerRef = useRef(null)

	const clearTimer = () => {
		clearInterval(timerRef.current)
	}
	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimerVal((time) => {
				if (time === 0) {
					clearTimer()
					onTimerFinish()
					return 0
				}
				return time - 1
			})
		}, timerInterval)
	}

	const handleRetryClick = async () => {
		if (pendingRetries.current === 0) {
			onRetryFinished()
		} else {
			pendingRetries.current -= 1
			await onRetry()
			setTimerVal(timer)
			startTimer()
		}
	}

	useEffect(() => {
		startTimer()
		return () => clearTimer()
	}, [])

	const renderResendTimer = () => {
		if (timerVal > 0) {
			return (
				<RetryText>
					{text} {new Date(timerVal * 1000).toISOString().substr(14, 5)} {helperText}
				</RetryText>
			)
		}
		if (retryComponent) {
			return <Span onClick={handleRetryClick}>{retryComponent}</Span>
		}
		return null
	}

	return <React.Fragment>{renderResendTimer()}</React.Fragment>
}

ResendTimer.defaultProps = {
	text: '',
	helperText: '',
	timer: 5,
	timerInterval: 1000,
	retryAttempts: 0,
	retryComponent: '',
	onRetryFinished: () => null,
	onTimerFinish: () => null,
	onRetry: () => null,
}

ResendTimer.propTypes = {
	text: string,
	helperText: string,
	timer: number,
	timerInterval: number,
	retryAttempts: number,
	retryComponent: string,
	onRetryFinished: func,
	onTimerFinish: func,
	onRetry: func,
}

export default ResendTimer
