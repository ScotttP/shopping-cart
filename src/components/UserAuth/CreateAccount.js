import { React } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormDiv = styled.div`
	height: 90vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgb(11, 23, 56);
	@media only screen and (max-width: 350px) {
		margin-top: 14px;
	}
`;

const SignUpAndLoginContainer = styled.form`
	background-color: rgb(216, 214, 214);
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	align-items: center;
	width: 25vw;
	height: 60vh;
	min-width: 290px;
	min-height: 560px;
	max-height: 600px;

	box-shadow: 0px 2px 15px 2px rgba(0, 0, 0, 0.75);
	@media only screen and (max-width: 1500px) {
	}
`;

const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 20vw;
	height: 100%;
	min-width: 240px;
	max-width: 300px;
	max-height: 550px;
`;

const SignUpHeader = styled.h1`
	margin: 2%;
`;

const FormLabels = styled.label`
	width: 20vw;
	min-width: 231px;
	margin: 5% 0 5% 0;
	font-size: 13px;
`;

const FormInputs = styled.input`
	width: 100%;
	height: 2rem;
	margin-top: 10px;
	padding: 2%;
	border: 1px solid rgb(11, 23, 56);
	border-radius: 5px;
`;

const PasswordTextDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SignUpButton = styled.button`
	&:hover {
		cursor: pointer;
		background-color: rgb(216, 214, 214);
		color: rgb(11, 23, 56);
		border: 2px solid rgb(11, 23, 56);
	}
	width: 100%;
	height: 2rem;
	border: 2px solid rgb(11, 23, 56);
	border-radius: 5px;
	background-color: rgb(11, 23, 56);
	color: #fff;

	transition: 0.3s;
`;

const AlreadyHaveAnAccount = styled.p`
	margin: 5% 2% 2% 2%;
`;

const CreateAccount = (props) => {
	return (
		<FormDiv>
			<SignUpAndLoginContainer onSubmit={(e) => props.signUpWithEmail(e)}>
				<FormContent>
					<SignUpHeader>Create An Account</SignUpHeader>
					<FormLabels>
						First Name<br></br>
						<FormInputs
							id="firstName"
							type="text"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					<FormLabels>
						Last Name<br></br>
						<FormInputs
							id="lastName"
							type="text"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					<FormLabels>
						Email
						<br></br>
						<FormInputs
							id="signUpEmailInput"
							type="email"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					<FormLabels>
						<PasswordTextDiv>Password</PasswordTextDiv>

						<FormInputs
							id="signUpPasswordInput"
							type="password"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>

					<br></br>

					<SignUpButton type="submit">
						<b>Sign Up</b>
					</SignUpButton>

					<br></br>
					<AlreadyHaveAnAccount>Already have an account?</AlreadyHaveAnAccount>
					<Link style={{ textDecoration: "none" }} to="/Login">
						<p
							onClick={props.resetErrors}
							style={{ textDecoration: "underline", color: "rgb(11, 23, 56)" }}
						>
							Login
						</p>
					</Link>
				</FormContent>
			</SignUpAndLoginContainer>
		</FormDiv>
	);
};

export default CreateAccount;
