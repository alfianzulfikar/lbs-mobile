const nameOfMonth = (monthNumber: number | string = 0) => {
  let month = '';
  switch (monthNumber) {
    case 1:
      month = 'januari';
      break;
    case 2:
      month = 'februari';
      break;
    case 3:
      month = 'maret';
      break;
    case 4:
      month = 'april';
      break;
    case 5:
      month = 'mei';
      break;
    case 6:
      month = 'juni';
      break;
    case 7:
      month = 'juli';
      break;
    case 8:
      month = 'agustus';
      break;
    case 9:
      month = 'september';
      break;
    case 10:
      month = 'oktober';
      break;
    case 11:
      month = 'november';
      break;
    case 12:
      month = 'desember';
      break;
    default:
      month = '';
      break;
  }

  return month;
};

export default nameOfMonth;
