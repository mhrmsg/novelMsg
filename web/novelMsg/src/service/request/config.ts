let BASE_URL = "";
let TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/novel";
  TIME_OUT = 5000;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "/novel";
} else {
  BASE_URL = "/novel";
}

export { BASE_URL, TIME_OUT };
