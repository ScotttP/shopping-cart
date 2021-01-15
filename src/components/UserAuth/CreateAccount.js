import { React } from "react";
// import Error from "../Error";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import googleLogo from "../../assets/icons8-google.svg";

const FormDiv = styled.div`
	height: 90vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	@media only screen and (max-width: 350px) {
		margin-top: 14px;
	}
`;

const SignUpAndLoginContainer = styled.form`
	background-color: #272626;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	align-items: center;
	width: 25vw;
	height: 55vh;
	min-width: 290px;
	min-height: 495px;
	max-height: 550px;
	box-shadow: 0px 1px 20px 1px rgb(40, 40, 40);
	@media only screen and (max-width: 1500px) {
		height: 50vh;
		max-height: 500px;
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
	max-height: 550px;
`;

const SignUpHeader = styled.h1`
	margin: 5%;
`;

const FormLabels = styled.label`
	width: 20vw;
	min-width: 231px;
	margin: 5%;
	font-size: 13px;
`;

const FormInputs = styled.input`
	width: 100%;
	height: 2rem;
	margin-top: 10px;
	padding: 2%;
	border: none;
	border-radius: 5px;
`;

const PasswordTextDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SignUpButton = styled.button`
	&:hover {
		cursor: pointer;
		background-color: #272626;
		color: #1da930;
	}
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
	background-color: #1da930;
	color: #fff;
	border: 1px #1da930 solid;
	transition: 0.3s;
`;

const GoogleButton = styled.button`
	&:hover {
		cursor: pointer;
		background-color: #272626;
		color: #fff;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
	color: #272626;
	border: 1px #fff solid;
	transition: 0.3s;
`;

const GoogleLogo = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 5px;
`;

const AlreadyHaveAnAccount = styled.p`
	margin: 5% 2% 2% 2%;
`;

const CreateAccount = (props) => {
	return (
		<FormDiv>
			<SignUpAndLoginContainer>
				<FormContent>
					<SignUpHeader>Create An Account</SignUpHeader>
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
					{/* <Error errors={props.errors} /> */}
					<br></br>

					<SignUpButton onClick={(e) => props.signUpWithEmail(e)}>
						<b>Sign Up</b>
					</SignUpButton>
					<br></br>
					<p>or sign up with</p>
					<br></br>
					<GoogleButton onClick={(e) => props.loginWithGoogle(e)}>
						<GoogleLogo></GoogleLogo>
						<b>Google</b>
					</GoogleButton>
					<br></br>
					<AlreadyHaveAnAccount>Already have an account?</AlreadyHaveAnAccount>
					<Link style={{ textDecoration: "none" }} to="/Login">
						<p
							onClick={props.resetErrors}
							style={{ textDecoration: "none", color: "#1DB954" }}
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
