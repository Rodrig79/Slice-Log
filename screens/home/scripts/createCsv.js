const formatNumber = number => `0${number}`.slice(-2);

export function createCsv(pieList) {
  var csvText = "NAME,TIME MADE,DISCARD,WASTE\n"
  for (const property in pieList) {
    var hours = pieList[property].hours % 12;
    hours = hours ? hours : 12;
    var ampm = pieList[property].hours >= 12 ? 'pm' : 'am'
    var startTime = hours + ':' + formatNumber(pieList[property].mins) + ' ' + ampm
    csvText = csvText + pieList[property].name + ',' +
                        startTime + ',' +
                        pieList[property].reason + ',' +
                        pieList[property].waste + '\n'
  }
  return csvText
}
