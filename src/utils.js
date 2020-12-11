import moment from "moment";

export const generateGreeting = () => {
  const currentHour = moment().format("HH");

  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 16) {
    return "Good Afternoon";
  } else return "Good Evening";
};

export const todaysDate = () => {
  return moment().format("dddd Do MMMM");
};
