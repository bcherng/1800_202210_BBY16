// Makes an HTTP get request and calls callback with the result
async function get(file, callback) {
  var result = await fetch(file);

  if (result.ok) {
    var r = await result.text();
    callback(r);
  }
}

// Replace an html element with contents of a file
export async function readFileAndSetHtml(id, file) {
  var element = document.getElementById(id);

  await get(file, (data) => {
    element.innerHTML = data;
  });
}
