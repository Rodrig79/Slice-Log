export function htmlContent(date, tempList) {

  var incomplete = ''
  var title = 'Temp Log ' + date
  var uploadString = '<br>11am:<br>'
  var temp;
  for (const property in tempList) {
    temp = tempList[property][0] == '' ? '?' : tempList[property][0]
    incomplete = temp == '?' ? 'INCOMPLETE' : incomplete
    uploadString = uploadString + property + ': ' + temp + '\u00B0' + 'F<br>'
  }
  uploadString = uploadString + '<br>5pm:<br>'
  for (const property in tempList) {
    temp = tempList[property][1] == '' ? '?' : tempList[property][1]
    uploadString = uploadString + property + ': ' + temp + '\u00B0' + 'F<br>'
  }

  return(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 25px;
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        <p style="color:red">${incomplete}</p>
        <p>${uploadString}</p>
    </body>
    </html>
  `)
}
