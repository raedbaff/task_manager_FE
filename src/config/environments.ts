const mode = import.meta.env.MODE;

export interface IEnvironemnt {
  env_name: string;
  apiBaseUrl: string;
}

export const localdev: IEnvironemnt = {
  env_name: "localdev",
  apiBaseUrl: "https://ltm-dev.inrits.tech/api/v1",
};

export const staging: IEnvironemnt = {
  env_name: "staging",
  apiBaseUrl: "https://ltm-staging.inrits.tech/api/v1",
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
