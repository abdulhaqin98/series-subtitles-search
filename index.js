// API Call
// http://localhost:5000/api/word/coitus
// http://localhost:5000/api/word/have&come&at
// https://series-subtitles-search-api.onrender.com/api/word/fanatic

window.onload = function () {

  document.getElementById('btn01').addEventListener("click", fetchMovies);

  // Get the input field
  var input = document.getElementById("querykey");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btn01").click();
    }
  });
}

var header = {};
var body = {};
var html = '';

async function fetchMovies() {

  // var word = id.split('&').join(' ');

  const key = document.getElementById('querykey').value.split(' ').join('&');

  html = '';
  document.getElementById('result').innerHTML = null;

  const response = await fetch('https://series-subtitles-search-api.onrender.com/api/word/' + key).then(res => res.json())
    .then(data => {
      header = data.header;
      body = data.body;
    }
    );

  console.log(header);
  console.log(body);
  // console.log(len);

  len = body.length;

  // len == 0 ? alert(series[i] + ' no data'): null;

  html += `<p class="text-white">${header.count > 0 ? header.count : 'No Results'}</p>`;
  for (j = 0; j < len; j++) {

    var dataLength = body[j].data.length;

    for (k = 0; k < dataLength; k++) {
      html += `
        <div class="card my-2 py-0">
        <div class="card-body justify-content-between py-1">
        <div class="d-flex justify-content-between py-1">
                      <h6 class="card-title my-auto col-6">${body[j].series}</h6>
                      <p >${body[j].episode}</p>
                      <p >${body[j].data[k].startTime}</p>
        </div>
                      <p >${body[j].data[k].text}</p>
                    </div>
                    </div>`;
    }
  } // end of for loop

  document.getElementById('result').innerHTML += html;

  html = '';
  header = '';
  body = '';

}
