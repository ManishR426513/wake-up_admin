import moment from "moment";

export function setReportFormatDate(date:string) {
    if (date) {
      let formattedDateTime = moment(date).format('MMM-DD-YY');
      return formattedDateTime;
    } else {
      return "";
    }
  }

export const handleProfileImage = (data: string) => {
  return data
    ? `${import.meta.env.VITE_IMAGE_VIDEO_URL}/${data}`
    : require('../assets/images/user.png');
};
