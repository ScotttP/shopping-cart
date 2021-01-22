import { React } from "react";
import { Link } from "react-router-dom";
// import Error from "../Error";
import styled from "styled-components";
// import googleLogo from "../../assets/icons8-google.svg";

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
	height: 55vh;
	min-width: 290px;
	min-height: 525px;
	max-height: 550px;
	box-shadow: 0px 2px 15px 2px rgba(0, 0, 0, 0.75);
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

const LoginHeader = styled.h1`
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
	border: 1px solid rgb(11, 23, 56);
	border-radius: 5px;
`;

const PasswordTextDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LoginButton = styled.button`
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

const DontHaveAnAccount = styled.p`
	margin: 5% 2% 2% 2%;
`;

const Login = (props) => {
	return (
		<FormDiv>
			{/* <span id="line"></span> */}
			<SignUpAndLoginContainer>
				<FormContent>
					<LoginHeader>Login</LoginHeader>

					<FormLabels>
						Email
						<br></br>
						<FormInputs
							id="loginEmailInput"
							type="email"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					<FormLabels>
						<PasswordTextDiv>
							Password
							<Link
								style={{ textDecoration: "none", color: "rgb(11, 23, 56)" }}
								to="/ForgotPassword"
							>
								Forgot Your Password?
							</Link>
						</PasswordTextDiv>

						<FormInputs
							id="loginPasswordInput"
							type="password"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					{/* <Error errors={props.errors} /> */}
					<br></br>

					<LoginButton onClick={(e) => props.loginWithEmail(e)}>
						<b>Login</b>
					</LoginButton>

					<br></br>
					<DontHaveAnAccount>Don't have an account?</DontHaveAnAccount>
					<Link style={{ textDecoration: "none" }} to="/CreateAnAccount">
						<p
							// onClick={props.resetErrors}
							style={{ textDecoration: "underline", color: "rgb(11, 23, 56)" }}
						>
							Create An Account
						</p>
					</Link>
				</FormContent>
			</SignUpAndLoginContainer>
		</FormDiv>
	);
};

export default Login;
