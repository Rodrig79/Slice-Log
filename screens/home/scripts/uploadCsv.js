import * as Google from 'expo-google-app-auth';
import * as FileSystem from 'expo-file-system';

export async function uploadCsv(date, uri, csv) {
  // var fileContent = 'sample text'
  // var file = new Blob([fileContent], {type: 'text/csv'})
  var name = "Slice-Log-" + date + ".csv"
  var metadata = {
      "name":"name",
      "mimeType":"application/vnd.google-apps.spreadsheet",
      "parents":[
        "1SdRy6zEnkp1a8Y2J3_1q1w4JbgczMlqu"
      ]
  }
  const { type, accessToken, user } = await Google.logInAsync({
    iosClientId: `457820335662-9emkpcnjk952sqr7dq3io1923ivcbqp6.apps.googleusercontent.com`,
    androidClientId: `457820335662-kid2mvk1travh8f50v3p8je6g226hmfi.apps.googleusercontent.com`,
    iosStandaloneAppClientId: `457820335662-9emkpcnjk952sqr7dq3io1923ivcbqp6.apps.googleusercontent.com`,
    androidStandaloneAppClientId: `457820335662-kid2mvk1travh8f50v3p8je6g226hmfi.apps.googleusercontent.com`,
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  if (type === 'success') {
    console.log(type);
  }

//simple upload success
  // let size = (await FileSystem.getInfoAsync(uri)).size
  // let headers = {
  //   Authorization: 'Bearer ' + accessToken,
  //   'Content-Type': 'text/csv',
  //   'Content-Length': size.toString()
  // }
  // let options = {
  //   headers: headers,
  //   httpMethod: 'POST',
  // }
  // try {
  //   let upload = await FileSystem.uploadAsync('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
  //                                 uri,
  //                                 options)
  //   console.log(upload)
  // } catch(error) {
  //   console.log(error)
  // }

// multipart upload attempt 2
  var form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json; charset=UTF-8'}))
  form.append('media', new Blob([csv], {type: 'text/csv'}))
  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    body: form,
  }).then((res) => {
    return res.json()
  }).then(function(val) {
    console.log(val)
  })
}
