type signinInfo = {
  usernameOrEmail: string;
  password: string;
  cookie: string;
};

type signupInfo = {
  username: string;
  email: string;
  password: string;
};

type FunctionResponse = {
  status: number;
  message: string;
}


interface ScrumvaluesProps {
  user: string;
}
