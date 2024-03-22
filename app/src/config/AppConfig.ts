type AppConfig = {
  env: string;
  logLevel: string;
  X_API_KEY: string;
  applicationConfig: {
    appTimeZone: string,
    paginationConfig: {
      pageSizeOptions: Array<number>,
      defaultSize: number;
    }
  };
  baseUrl: string;
  apiUrl: string;
  roles: object,
};

export default AppConfig;
