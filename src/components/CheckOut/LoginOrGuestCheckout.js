const LoginOrGuestCheckout = (props) => {
	if (props.currentUser || props.currentUser.isAnonymous)
		return <div>Sign in or guest checkout form</div>;
	else return <div>skip to go to general account informaiton</div>;
};

export default LoginOrGuestCheckout;
