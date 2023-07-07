type UserInfo = {
  username: string;
  email: string;
  password: string;
  isActivated: boolean = false
  cookie: string = null;
};

type ServerResponse = {
  message: string;
  status: number;
}

interface ScrumvaluesProps {
  user: string;
}
