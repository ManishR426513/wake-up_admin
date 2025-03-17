import moment from "moment";


export function setReportFormatDate(date:string) {
    if (date) {
      let formattedDateTime = moment(date).format('MMM-DD-YY');
      return formattedDateTime;
    } else {
      return "";
    }
  }