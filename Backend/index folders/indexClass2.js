function readFileAsync(callback) {
  setTimeout(() => {
    const data = "Hello, this is the content of the file";
    callback(null, data);
  }, 200);
}

console.log("Start reading files....");

readFileAsync((err, data) => {
  if (err) {
    console.log("Error loading files");
    return;
  }
  console.log("file content: ", data);
});

console.log("After calling readFileAsync, continue with other tasks ...");
