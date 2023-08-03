// navbar
let value = 1;
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
 const dataDiv = document.getElementById("mybox");

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  menu.classList.toggle('active');
  if(value%2==1){
   dataDiv.style.marginTop = "150px";
  }
  else{
    dataDiv.style.marginTop = "30px";
  }
  value++;
  if(value==10) value=0;
});



// main-data-tracker/displayer
const gridButton = document.getElementById('gridButton');
const listButton = document.getElementById('listButton');
const gridData = document.getElementById('gridData');
const listData = document.getElementById('listData');

gridButton.addEventListener('click', () => {
  showData(gridData, gridButton);
 gridData.style.display="grid";
  gridData.style.gridTemplateColumn="repeat(4 1fr)";
});

listButton.addEventListener('click', () => {
  showData(listData, listButton);
});

function showData(dataElementToShow, buttonToShow) {
  const allDataElements = document.querySelectorAll('#selectedPartData > div');
  const allButtons = document.querySelectorAll('.container button');

  // Hide all data elements and remove active class from all buttons
  allDataElements.forEach((dataElement) => {
    dataElement.style.display = 'none';
  });

  allButtons.forEach((button) => {
    button.classList.remove('active');
  });

  // Show the selected data element and highlight the clicked button
  dataElementToShow.style.display = 'block';
  buttonToShow.classList.add('active');
}

// fetching data
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Render grid view
    data.forEach(coin => renderCoinGrid(coin));

    // Render list view
    data.forEach(coin => renderCoinList(coin));
  })
  .catch(error => console.error("Error fetching data:", error));

  function renderCoinGrid(coin) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
  
    // Create elements to display data
    const logoAndNameDiv = document.createElement("div");
    const elementLogo = document.createElement("img");
    elementLogo.src= coin.image;
    elementLogo.style.width="50px";
    elementLogo.style.height="50px";
    
    const nameDiv = document.createElement("div");
    const symbolElement = document.createElement("h5");
    symbolElement.innerText = coin.symbol.toUpperCase();
    symbolElement.style.marginBottom="1px";
    const nameElement = document.createElement("p");
    nameElement.textContent = coin.name;
    nameDiv.appendChild(symbolElement);
    nameDiv.appendChild(nameElement);
    logoAndNameDiv.appendChild(elementLogo);
    logoAndNameDiv.appendChild(nameDiv);
    logoAndNameDiv.style.display="flex";
   logoAndNameDiv.style.justifyContent="start";
    elementLogo.style.marginRight="10px";
    const  priceChangePercentageElement = document.createElement("p");
    priceChangePercentageElement.innerText = coin.price_change_percentage_24h+" %";
    priceChangePercentageElement.style.fontWeight="bold";
   priceChangePercentageElement.style.border="2px solid white";
    priceChangePercentageElement.style.padding= "5px 15px";
    priceChangePercentageElement.style.borderRadius="20px";
     priceChangePercentageElement.style.display="inline-block"; 
    
  
    const priceElement = document.createElement("p");
    priceElement.textContent = "$" + coin.current_price.toFixed(2);
    
    priceElement.style.fontWeight="bold";
    if(coin.price_change_percentage_24h>=0){
      priceChangePercentageElement.style.color= "#334B32";
      priceElement.style.color= "#334B32";
      priceChangePercentageElement.style.borderColor = "#334B32"; 
   }
   else{
     priceChangePercentageElement.style.color= "#A03B37";
     priceElement.style.color= "#A03B37";
     priceChangePercentageElement.style.borderColor = "#A03B37";
   }
  
    const marketCapElement = document.createElement("p");
    marketCapElement.textContent = "Market Cap: $" + coin.market_cap.toLocaleString();

    const totalVolumeElement = document.createElement("p");
     totalVolumeElement.innerText = "Total Volume: " +coin.total_volume;
  
    // Append elements to list item
    gridItem.appendChild(logoAndNameDiv);
    gridItem.appendChild(priceChangePercentageElement);
    gridItem.appendChild(priceElement);
    gridItem.appendChild(totalVolumeElement);
    gridItem.appendChild(marketCapElement);
    gridItem.style.color="white";
    gridItem.style.marginBottom="20px";
    gridItem.style.padding="15px 15px";
    gridItem.style.transition="transform 0.1s"
    gridItem.addEventListener('mouseover', () => {
      gridItem.style.transform="scale(1.1)";
      gridItem.style.background="#333";
      logoAndNameDiv.style.background="#333";
      nameDiv.style.background="#333";
    });
    gridItem.addEventListener('mouseout', () => {
      gridItem.style.transform="scale(1.0)";
      gridItem.style.background="#1B1B1B";
      logoAndNameDiv.style.background="#1B1B1B";
      nameDiv.style.background="#1B1B1B";
    });
    gridData.appendChild(gridItem);

  }
  
//   id: Cryptocurrency ID
// name: Cryptocurrency Name
// image: URL to the cryptocurrency's image
// current_price: Current price of the cryptocurrency in USD
// market_cap: Market capitalization of the cryptocurrency
// price_change_percentage_24h: Price change percentage in the last 24 hours
// total_volume:Total Volume of the coin

  // Function to render a cryptocurrency in list view
 function renderCoinList(coin) {
    const listDataTable= document.getElementById('list-data-table');
    const listItem =  document.createElement("tr");
    listItem.classList.add("list-item");
  
    // Create elements to display data
     const imgElement = document.createElement('td');
    const elementLogo = document.createElement("img");
    elementLogo.src= coin.image;
    elementLogo.style.width="50px";
     imgElement.appendChild(elementLogo);

    const nameListElement = document.createElement("td");
    const nameDiv = document.createElement("div");
    const symbolElement = document.createElement("h6");
    symbolElement.innerText = coin.symbol.toUpperCase();
    symbolElement.style.marginTop="5px";
    const nameElement = document.createElement("p");
    nameElement.textContent = coin.name;
    nameDiv.appendChild(symbolElement);
    nameDiv.appendChild(nameElement);
    nameListElement.appendChild(nameDiv);
     
    const  priceChangePercentageElement = document.createElement("p");
    priceChangePercentageElement.innerText = coin.price_change_percentage_24h+" %";
    priceChangePercentageElement.style.fontWeight="bold";
    priceChangePercentageElement.style.border="2px solid white";
    priceChangePercentageElement.style.padding= "5px 15px";
    priceChangePercentageElement.style.borderRadius="20px";
    priceChangePercentageElement.style.display="inline-block"; 
    priceChangePercentageElement.style.marginTop="13px";
    
  
    const priceElement = document.createElement("td");
    priceElement.textContent = "$" + coin.current_price.toFixed(2);
    priceElement.style.fontWeight="bold";
    if(coin.price_change_percentage_24h>=0){
      priceChangePercentageElement.style.color= "#334B32";
      priceElement.style.color= "#334B32";
      priceChangePercentageElement.style.borderColor = "#334B32"; 
   }
   else{
     priceChangePercentageElement.style.color= "#A03B37";
     priceElement.style.color= "#A03B37";
     priceChangePercentageElement.style.borderColor = "#A03B37";
   }
  
    const marketCapElement = document.createElement("td");
    marketCapElement.textContent = "$" + coin.market_cap.toLocaleString();

    const totalVolumeElement = document.createElement("td");
     totalVolumeElement.innerText = coin.total_volume;
  
    // Append elements to list item
    listItem.appendChild(imgElement);
    listItem.appendChild(nameListElement);
    listItem.appendChild(priceChangePercentageElement);
    listItem.appendChild(priceElement);
    listItem.appendChild(totalVolumeElement);
    listItem.appendChild(marketCapElement);
    listItem.style.color="white";
    listItem.style.marginBottom="25px";
    const allTds = listItem.querySelectorAll('td');
    allTds.forEach(td => {
      td.style.textAlign = 'start';
      // td.style.verticalAlign = 'middle';
    });
    // listItem.style.width = '100%';
     listDataTable.appendChild(listItem);
  }