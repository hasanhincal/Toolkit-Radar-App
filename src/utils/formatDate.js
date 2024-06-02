import moment from "moment";

const formatDate = (unix_time) => {
  const date = new Date(unix_time * 1000);

  return moment(date).calendar();
};
export default formatDate;
