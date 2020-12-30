// import * as Google from 'expo-google-app-auth'
// import * as AppAuth from 'expo-app-auth'
import * as AuthSession from 'expo-auth-session'
import * as GoogleSignIn from 'expo-google-sign-in';
import * as FileSystem from 'expo-file-system'

export async function uploadCsv(date, uri, csv) {
  var name = `"Slice-Log-` + `${date}"`
  var metadata = {
      "name":name,
      "mimeType":"application/vnd.google-apps.spreadsheet",
      "parents":[
        "1SdRy6zEnkp1a8Y2J3_1q1w4JbgczMlqu"
      ]
  }

// google login for expo-cli
  // const { type, accessToken, user } = await Google.logInAsync({
  //   iosClientId: `457820335662-9emkpcnjk952sqr7dq3io1923ivcbqp6.apps.googleusercontent.com`,
  //   androidClientId: `457820335662-kid2mvk1travh8f50v3p8je6g226hmfi.apps.googleusercontent.com`,
  //   iosStandaloneAppClientId: `457820335662-9emkpcnjk952sqr7dq3io1923ivcbqp6.apps.googleusercontent.com`,
  //   androidStandaloneAppClientId: `457820335662-iakle1qk9tk85icoa5vqadjmbj3s8180.apps.googleusercontent.com`,
  //   webClientId: `457820335662-qtvgg1216he2keknrb142t1k5m58jtbg.apps.googleusercontent.com`,
  //   scopes: ['https://www.googleapis.com/auth/drive'],
  //   behavior: 'web',
  //   redirectUrl: `${AppAuth.OAuthRedirect}:/oauthredirect`
  // });
  // if (type === 'success') {
  //   console.log(type);
  // }

// google login for standalone android apk
  var accessToken = '';
  await GoogleSignIn.askForPlayServicesAsync();
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === 'success') {
      accessToken = user.auth.accessToken
    }
  } catch ({ message }) {
    alert('login: Error:' + message);
  }

  var boundary = "--boundary1234"
  var body = ""
  body += boundary + "\r\n" +
          "Content-Type: application/json; charset=UTF-8" + "\r\n\r\n" +
          `{
              "name":` + name + `,
              "mimeType":"application/vnd.google-apps.spreadsheet",
              "parents":[
                "1SdRy6zEnkp1a8Y2J3_1q1w4JbgczMlqu"
              ]
          }` + "\r\n" +
          boundary + "\r\n" +
          "Content-Type: text/csv" + "\r\n\r\n" +
          csv + "\r\n" +
          boundary + "--"

  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      "Content-Type": "multipart/related; boundary=boundary1234",
      "Content-Size": (await FileSystem.getInfoAsync(uri)).size.toString()
    },
    body: body,
  }).then((res) => {
    return res.json()
  }).then(function(val) {
    console.log(val)
  })
}
