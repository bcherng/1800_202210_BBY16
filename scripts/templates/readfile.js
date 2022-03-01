async function get(file, callback) {
  var result = await fetch(file);

  if (result.ok) {
    var r = await result.text();
    callback(r);
  }
}

export async function readFileAndSetHtml(id, file) {
  var element = document.getElementById(id);

  await get(file, (data) => {
    element.innerHTML = data;
  });
}
