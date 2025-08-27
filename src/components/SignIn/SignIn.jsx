import AuthForm from "../AuthForm/AuthForm";

const SignIn = ({ setIsAuth }) => {
  return <AuthForm setIsAuth={setIsAuth} isSignUp={false} />;
};

export default SignIn;
