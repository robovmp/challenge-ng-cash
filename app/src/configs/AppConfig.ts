type IAppConfig = {
  API_USER: string;
  API_LOGIN: string;
  API_TRANSACTIONS: string;
};

const AppConfig: IAppConfig = {
  API_USER: "http://localhost:3000",
  API_LOGIN: "http://localhost:3001",
  API_TRANSACTIONS: "http://localhost:3002",
};

export default AppConfig;
