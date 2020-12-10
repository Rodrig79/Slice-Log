import * as Google from 'expo-google-app-auth';

export async function uploadCsv(date, uri) {
  var fileContent = 'sample text'
  var file = new Blob([fileContent], {type: 'text/csv'})
  var name = 'Slice Log ' + date + '.csv'
  var metadata = {
      'name': name,
      'mimeType': 'text/csv',
      'parents': ['1WvvP0PE00lKAFKxzQJpL8iqDkN9HZQrm'],
  };
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

  var form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
  }).then((res) => {
      return res.json();
  }).then(function(val) {
      console.log(val);
  });
}
