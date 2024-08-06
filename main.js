const apiKey = "Pfj0YsU5qSPBCBcWoU%2FX6R6QukRy4q5d0oOdwebFLpXg8elmZl%2FNS6ybDe1kGqNao4XAE9%2F6S8SaisD9XIU9Cw%3D%3D";
let numOfRows = 0; //한 페이지 결과수
let newsList = [];
let kospiList = [];
let stockList = [];

// 주식 데이터 가져오기
const getStockData = async() => {
  numOfRows = 30;
  const stockUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&resultType=json&numOfRows=${numOfRows}`;

  try{
    const response = await fetch(stockUrl);
    const data = await response.json();
    let stockData = data.response.body.items;
    stockList = stockData.item;
    stockRender();
    console.log('stockData :',stockList)
  } catch (error){
    console.log('Error fetching stockData:',error)
  }
};

// 주식 데이터 그리기 
const stockRender = () =>{
  let stockBoard = stockList.map((item) =>{
    let changeColor = item.fltRt < 0 ? 'vsMinus' : 'vsPlus'
   return `
     <tr>
    <th scope="row" class="verticalMenu">${item.itmsNm}</th>
      <td>${item.clpr}</td>
      <td>${item.hipr}</td>
      <td>${item.lopr}</td>
      <td>${item.mkp}</td>
      <td class="${changeColor}">${item.fltRt}%</td>
    </tr>
    `
}).join(' ');
  document.getElementById("stock-board").innerHTML = stockBoard;
} 


// 지수 데이터 가져오기
const getKospiData = async() => {
  numOfRows = 140;
  const kospiUrl = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=${apiKey}&resultType=json&numOfRows=${numOfRows}`

  try{
    const response = await fetch(kospiUrl);
    const data = await response.json();
    const kospiData = data.response.body.items;
    kospiList = kospiData.item;
    console.log('kospiData :',kospiList)
    kospiRender(['코스닥','코스피','코스피 50','코스피 100','코스피 200','코스피 200','코스피 중형주','코스피 소형주','코스닥 50','코스닥 150','KRX 100','KRX 300']);
  } catch (error){
    console.log('Error fetching kospiData:',error)
  }
};

// 지수 데이터 그리기
const kospiRender = (names) =>{
  let kospiMark = `https://i.namu.wiki/i/IpVSj-BLH7WtjivfEInwSes-HO22iclfabXs6xh5dm8vJ_W5mXV9QTvPoIFFiLC2M4g2p_lQk0zWMgnAw09LXA.svg`
  const filterKospi = kospiList.filter(item=>names.includes(item.idxNm))

  const orderMap = {
    "코스피": 1,
    "코스닥": 2,
    "코스피 50": 3,
    "코스피 100": 4,
    "코스피 200": 5,
    "코스피 소형주": 6,
    "코스피 중형주": 7,
    "코스닥 150": 8,
    "KRX 100": 9,
    "KRX 300": 10
    // 추가적으로 필요한 경우 여기에 계속 추가 가능
  };

  // idxNm을 orderMap에 따라 정렬
  filterKospi.sort((a, b) => {
    return orderMap[a.idxNm] - orderMap[b.idxNm];
  });

  let kospiIndex = filterKospi.map((item)=>{
    let changeColor = item.fltRt < 0 ? 'vsMinus' : 'vsPlus'
  return `
  <tr>
    <th scope="row" class="verticalMenu"><img src="${kospiMark}" alt="" class="kospiMark">${item.idxNm}</th>
      <td>${item.clpr}</td>
      <td>${item.hipr}</td>
      <td>${item.lopr}</td>
      <td>${item.mkp}</td>
      <td class="${changeColor}">${item.fltRt}%</td>
    </tr>`
  }).join(' ');
  document.getElementById("kospi-board").innerHTML = kospiIndex;

  let filterList = filterKospi.slice(0,2);
  let innerKospi = filterList.map((item)=>{
    let vsColor = item.vs < 0 ? 'vsMinus' : 'vsPlus'
    return `
    <tr>
    <th scope="row" class="verticalMenu">${item.idxNm}</th>
      <td>${item.clpr}</td>
      <td class="${vsColor}">${item.vs}%</td>
    </tr>`
  }).join(' ');
  document.getElementById("inner-board").innerHTML = innerKospi;
  console.log(filterList)
}

// 뉴스 데이터 가져오기
const getNewsData = async() => {
  let numOfRows = 20;
  const newsUrl = `https://apis.data.go.kr/B410001/kotra_overseasMarketNews/ovseaMrktNews/ovseaMrktNews?serviceKey=${apiKey}&type=json&numOfRows=${numOfRows}&pageNo=1&search1=%EB%AF%B8%EA%B5%AD`

  try{
    const response = await fetch(newsUrl);
    const data = await response.json();
    const newsData = data.response.body.itemList;
    newsList = newsData.item
    console.log('newsList :',newsList)
    newsRender();
  } catch (error){
    console.log('Error fetching newsData:',error)
  }
}

// 뉴스 그리기
const newsRender = () => {
  let index = 0;
  const updateNews = () => {
    const updateNewsItem = newsList[index];
    const updateNewsCard = `
      <div>${updateNewsItem.newsTitl}</div>
    `;
    document.querySelector(".newsSection").innerHTML = updateNewsCard;
    index = (index + 1) % newsList.length;
  };

  // 뉴스 항목을 주기적으로 변경
  updateNews(); // 초기 뉴스 항목 업데이트
  setInterval(updateNews, 5000); // 5초마다 뉴스 항목 업데이트

  const mainNews = newsList[0];
  let mainCard = `
  <a class="newsLink" href="${mainNews.kotraNewsUrl}" target="blank">
    <h2>${mainNews.newsTitl}</h2>
    <p>${mainNews.cntntSumar}</p>
    </a>
  `
  document.querySelector(".innerText").innerHTML = mainCard

  const topNews = newsList.slice(1,6);
  let newsCard = topNews.map((news) => `
        <tr>
          <th class="news-title" scope="row">
          <a class="newsLink" href="${news.kotraNewsUrl}" target="blank">${news.newsTitl}</a>
          </th>
        </tr>`
    )
    .join(' ');
    document.getElementById("card-news").innerHTML = newsCard;
    hideSpinner();
};

// 로딩 끝나면 스피너 숨기기
const hideSpinner = () =>{
  const spinner = document.querySelector(".d-flex");
  spinner.style.setProperty("display", "none", "important");
}

const getData = () => {
  getNewsData()
    .then(() => getStockData())
    .then(() => getKospiData())
    .finally(() => hideSpinner()); // 모든 데이터 로딩 완료 후 스피너 숨기기
};

getData();

// 차트 데이터 가져오기
const getDayKospi = async() =>{
  numOfRows = 10;
  const daykospiUrl = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=${apiKey}&resultType=json&idxNm=코스피&numOfRows=${numOfRows}`
  try{
    const response = await fetch(daykospiUrl);
    const data = await response.json();
    const dayKospidata = data.response.body.items.item
    const kospiItem = [['Time','Price']]
    
    dayKospidata.forEach(item =>{
      const month = item.basDt.slice(4, 6); // 월
      const day = item.basDt.slice(6, 8); // 일
      // 날짜 형식을 MMDD로 변환
      const formattedDate = `${month}${day}`;
      kospiItem.push([formattedDate, parseFloat(item.clpr)])
    })
    kospiItem.sort((a, b) => a[0] - b[0]);
    console.log("dayList :", kospiItem);
    
  return kospiItem;
  } catch (error) {
    console.error("Error fetching dayKospi data:", error);
  }
}

// 구글 차트
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      async function drawChart () {
        const chartData = await getDayKospi();

        if (!chartData) {
          console.error("Failed to load chart data.");
          return;
        }

        var data = google.visualization.arrayToDataTable(chartData);

        var options = {
          title: '코스피',
          curveType: 'none',
          legend: { position: 'bottom' },
          hAxis: {
            slantedText: true, // 레이블이 겹치지 않도록 회전
            slantedTextAngle: 45 // 레이블 회전 각도
          },
          chartArea: {
            left: 30, // 차트 영역의 왼쪽 여백
            right: 30, // 차트 영역의 오른쪽 여백
            top: 30, // 차트 영역의 위쪽 여백
            bottom: 50 // 차트 영역의 아래쪽 여백
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart'));

        chart.draw(data, options);
      }