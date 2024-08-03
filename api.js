const apiKey = "Pfj0YsU5qSPBCBcWoU%2FX6R6QukRy4q5d0oOdwebFLpXg8elmZl%2FNS6ybDe1kGqNao4XAE9%2F6S8SaisD9XIU9Cw%3D%3D";
let numOfRows = 100; //한 페이지 결과수

const getStockData = async() => {
  const stockUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&resultType=json&numOfRows=${numOfRows}`;

  try{
    const response = await fetch(stockUrl);
    const data = await response.json();
    const stockData = data.response.body.items;
    console.log('stockData :',stockData)
  } catch (error){
    console.log('Error fetching stockData:',error)
  }
};
getStockData();

const getKospiData = async() => {
  const kospiUrl = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=${apiKey}&resultType=json&numOfRows=${numOfRows}`

  try{
    const response = await fetch(kospiUrl);
    const data = await response.json();
    const kospiData = data.response.body.items;
    console.log('kospiData :',kospiData)
  } catch (error){
    console.log('Error fetching kospiData:',error)
  }
};

getKospiData();

const getNewsData = async() => {
  let numOfRows = 10;
  const newsUrl = `https://apis.data.go.kr/B410001/kotra_overseasMarketNews/ovseaMrktNews/ovseaMrktNews?serviceKey=${apiKey}&type=json&numOfRows=${numOfRows}&pageNo=1&search1=%EB%AF%B8%EA%B5%AD`

  try{
    const response = await fetch(newsUrl);
    const data = await response.json();
    const newsData = data.response.body.itemList;
    console.log('newsData :',newsData)
  } catch (error){
    console.log('Error fetching newsData:',error)
  }
}

getNewsData();

