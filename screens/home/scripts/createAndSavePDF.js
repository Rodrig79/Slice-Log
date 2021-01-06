import * as FileSystem from 'expo-file-system';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import {htmlContent} from './htmlContent';
import {createCsv} from './createCsv';
import {uploadCsv} from './uploadCsv';


export async function createAndSavePDF(pieList) {
  var today = new Date()
  var yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (today.getHours() < 6) {
    today = yesterday
  }
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()
  var date = mm + '/' + dd + '/' + yyyy
  var dateFile = mm+ '-' + dd + '-' + yyyy
  const html = htmlContent(date, pieList)
  const csv = createCsv(pieList)
  try {
    const { uri } = await Print.printToFileAsync({ html });
    const pdfUri = uri.slice(0, uri.lastIndexOf('/')+1) + 'slice-log-' + dateFile + '.pdf'
    const csvUri = uri.slice(0, uri.lastIndexOf('/')+1) + 'slice-log-' + dateFile + '.csv'
    await FileSystem.moveAsync({
      from: uri,
      to: pdfUri
    })
    await FileSystem.writeAsStringAsync(csvUri, csv)
    await Sharing.shareAsync(csvUri)
    // uploadCsv(dateFile, csvUri, csv)

  } catch (error) {
    console.error(error);
  }
};
