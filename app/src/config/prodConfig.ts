import AppConfig from "./AppConfig";

let w = window as any;

const prodConfig: AppConfig = {
  env: "PRODUCTION",
  logLevel: (w._env_ && w._env_.REACT_APP_LOG_LEVEL) || 'verbose',
  X_API_KEY: (w._env_ && w._env_.REACT_APP_X_API_KEY) || '',
  applicationConfig: {
    appTimeZone: (w._env_ && w._env_.REACT_APP_TIME_ZONE_NAME) ?? 'Asia/Manila',
    paginationConfig: {
      pageSizeOptions: [10, 15, 20],
      defaultSize: 20
    },
  },
  baseUrl: (w._env_ && w._env_.REACT_APP_BASE_URL) || 'http://10.101.15.207:8000',
  apiUrl: (w._env_ && w._env_.REACT_API_URL) || 'http://localhost:4001/api/v1',
  roles: {
    admin: 'Admin',
    user: 'User',
  },
};

export default prodConfig;
