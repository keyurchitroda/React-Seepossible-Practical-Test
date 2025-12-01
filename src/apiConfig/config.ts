const configSwitcher = (environmentType: string) => {
  let configuration;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `https://dummyjson.com/`,
      };
      break;
    default:
      configuration = {
        API_URL: `https://dummyjson.com/`,
      };
  }

  return configuration;
};

export const config =
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : { API_URL: "", ImageUrl: "" };
