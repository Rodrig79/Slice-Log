export function createCsv(tempList) {
  var csvText = "APPLIANCE,TIME,TEMP \u00B0F\n"
  for (const property in tempList) {
    csvText = csvText + property + ',' +
                        '11am' + ',' +
                        tempList[property][0] + '\n'
  }
  for (const property in tempList) {
    csvText = csvText + property + ',' +
                        '5pm' + ',' +
                        tempList[property][1] + '\n'
  }
  return csvText
}
