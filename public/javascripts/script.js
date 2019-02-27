
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


axios.get('https://api.coinstats.app/public/v1/coins')
.then(responseFromAPI => {
    // removeErrDiv();
    console.log(responseFromAPI);
    let html = ''
    for(let i = 0; i <=19; i++) {
      const coinName = responseFromAPI.data.coins[i].name;
      const coinPrice = responseFromAPI.data.coins[i].price;
      const icon = responseFromAPI.data.coins[i].icon
      console.log(coinName)
      html += `<li><img src="${icon}"/>${coinName} : $${coinPrice.toFixed(2)}</li>`
      //document.getElementById("coinPrice").innerHTML += coinPrice;
      //appendText();
    }
  document.getElementById("coinName").innerHTML = `<ul>${html}</ul>`

    // instead in the console, show data in the browser using JS DOM manipulation:
  })
  .catch(err => {
    if (err.response.status === 404) {
      removeCountryInfo();
      createDiv();
      const theErr = document.createTextNode(`What the heck is ${theName}? 🤭`);
      errDiv.appendChild(theErr);
    } else {
      console.log('err => ', err)
    }
  })
