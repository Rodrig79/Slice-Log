import * as FileSystem from 'expo-file-system';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import {htmlContent} from './htmlContent';
import {createCsv} from './createCsv';

export async function createAndSavePDF(date, dateFile, tempList) {
  const html = htmlContent(date, tempList)
  const csv = createCsv(tempList)
  try {
    const { uri } = await Print.printToFileAsync({ html });
    const pdfUri = uri.slice(0, uri.lastIndexOf('/')+1) + 'temp-log-' + dateFile + '.pdf'
    const csvUri = uri.slice(0, uri.lastIndexOf('/')+1) + 'temp-log-' + dateFile + '.csv'
    await FileSystem.moveAsync({
      from: uri,
      to: pdfUri
    })
    await FileSystem.writeAsStringAsync(csvUri, csv)
    if (Platform.OS === "ios") {
      await Sharing.shareAsync(csvUri);
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const temp = await MediaLibrary.createAssetAsync(pdfUri)
        await MediaLibrary.createAlbumAsync('Temp Logs', tempLog, true)
        await MediaLibrary.deleteAssetsAsync([temp])
        await Sharing.shareAsync(csvUri);
      }
    }

  } catch (error) {
    console.error(error);
  }
};
