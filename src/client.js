function search(query, cb) {

  //DEV
  const URL = "/api/v1/search/words?keyword=";
  //PROD
  // const URL = "http://jisho.org/api/v1/search/words?keyword=";

  return fetch(`${URL}${query}`, {
    accept: 'application/json',
    header: "",
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
