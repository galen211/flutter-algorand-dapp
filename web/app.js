function alertMessage(text) {
    alert(text)
}

window.logger = (flutter_value) => {
   console.log({ js_context: this, flutter_value });
}

// algosigner, check if installed
if (typeof AlgoSigner !== 'undefined') {
    document.getElementById("check-code").innerHTML = "AlgoSigner is installed.";
  } else {
    document.getElementById("check-code").innerHTML = "AlgoSigner is NOT installed.";
  };

// connect to algosigner
AlgoSigner.connect()
.then((d) => {
  document.getElementById("connect-code").innerHTML = JSON.stringify(d);
})
.catch((e) => {
  console.error(e);
  document.getElementById("connect-code").innerHTML = JSON.stringify(e);
});