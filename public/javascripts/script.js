
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
      const icon = responseFromAPI.data.coins[i].icon;
      const priceChange = Number(responseFromAPI.data.coins[i].priceChange1d);
      html += 
      `
      <li>
        <img src="${icon}"/> 
        <a class="col-lg-3" href="/${coinName.toLowerCase()}/social"><span> ${coinName} </span></a>
        <span class="col-lg-3"> $${coinPrice.toFixed(2)}</span>
        <span class="col-lg-3 percent-change"> ${priceChange}</span>
        <a class="col-lg-3" href="/${coinName.toLowerCase()}/social">
        <button class="socials-button">Socials</button></a>
      </li>
      `
    }
  document.getElementById("coinName").innerHTML = `<ul>${html}</ul>`

  $('.percent-change').each(function (e) {
    //$(this).css({ color: 'red' })
    console.log(this.innerHTML)
    console.log('test')
    if (this.innerHTML < 0) {
      this.style.color = "red";
      this.innerHTML += '%'
    } else {
      this.style.color = "green";
      this.innerHTML += '%'
    }
  });

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


