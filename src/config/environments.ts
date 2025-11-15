const mode = import.meta.env.MODE;

export interface IEnvironemnt {
  env_name: string;
  apiBaseUrl: string;
}

export const localdev: IEnvironemnt = {
  env_name: "localdev",
  apiBaseUrl: import.meta.env.VITE_BE_URL,
};

export const staging: IEnvironemnt = {
  env_name: "staging",
  apiBaseUrl: import.meta.env.VITE_BE_URL,
};

export const getCurrentEnvironment = (): IEnvironemnt => {
  switch (mode) {
    case localdev.env_name:
      return localdev;
    case staging.env_name:
      return staging;
    default:
      return localdev;
  }
};
