const formatNumber = number => `0${number}`.slice(-2);

export function htmlContent(date, pieList) {
  var title = 'Slice Log ' + date

  var html = `
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

            #sliceLog {
              font-family: Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            #sliceLog td, #sliceLog th {
              border: 1px solid #ddd;
              padding: 8px;
            }

            #sliceLog tr:nth-child(even){background-color: #f2f2f2;}

            #sliceLog tr:hover {background-color: #ddd;}

            #sliceLog th {
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: #07121B;
              color: white;
            }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        <table id="sliceLog">
          <tr>
            <th>NAME</th>
            <th>TIME</th>
            <th>DISCARD</th>
            <th>WASTE</th>
          </tr>`
  for (const property in pieList) {
    var hours = pieList[property].hours % 12;
    hours = hours ? hours : 12;
    var ampm = pieList[property].hours >= 12 ? 'pm' : 'am'
    var startTime = hours + ':' + formatNumber(pieList[property].mins) + ' ' + ampm
    html = html + `<tr>
      <td>${pieList[property].name}</td>
      <td>${startTime}</td>
      <td>${pieList[property].reason}</td>
      <td>${pieList[property].waste}</td>
    </tr>`
  }
  html = html + `</table>
    </body>
    </html>`
  return(html)
}
