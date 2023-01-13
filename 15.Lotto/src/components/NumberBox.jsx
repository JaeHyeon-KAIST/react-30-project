import React, { useState } from 'react';
import styled from "@emotion/styled";

const StyledNumberBox = styled.select`
	width: 48px;
	height: 48px;
	border: #48AEFF solid 1px;
	color: #48AEFF;
	font-size: 14px;

	appearance: none;
	padding-left: ${({ num }) => num >= 10 ? 16 : 20}px;

	&:disabled {
		opacity: 1;
	}
`;

const NumberBox = ({num, setNum}) => {

	return <StyledNumberBox num={num ?? 0} value={num ?? "+"}
		disabled={!setNum}
		onChange={(event) => {
			if (setNum) setNum(parseInt(event.currentTarget.value));
	}}>
		{
			!num
				?	<option>+</option>
				: Array(45).fill(0).map((value, idx) => (
						<option>
							{idx + 1}
						</option>
					))
		}
	</StyledNumberBox>
}

export default NumberBox;