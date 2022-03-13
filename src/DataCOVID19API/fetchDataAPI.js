function fetchDataAPI() {
  // const getData = (url) => {
  //   var request = require("request");
  //   var options = {
  //     method: "GET",
  //     url: url,
  //     headers: {},
  //   };
  //   request(options, function(error, response) {
  //     if (error) throw new Error(error);
  //     this.data = JSON.parse(response.body);
  //     return this.data;
  //   });
  // };
  // function getData(url) {
  //   var data = {};
  //   var request = require("request");
  //   var options = {
  //     method: "GET",
  //     url: url,
  //     headers: {},
  //   };
  //   request(options, function(error, response) {
  //     if (error) throw new Error(error);
  //     data = JSON.parse(response.body);
  //   });
  //   return data;
  // }

  const handleData = {
    getCountriesName() {
      var countriesName = new Array();
      var request = require("request");
      var options = {
        method: "GET",
        url: "https://api.covid19api.com/countries",
        headers: {},
      };
      request(options, function(error, response) {
        if (error) throw new Error(error);
        var obj = JSON.parse(response.body);
        obj.forEach((v) => {
          countriesName.push({ Country: v.Country, Slug: v.Slug });
        });
      });

      return countriesName;
    },
    getDataByCountryDate(countryName, infectionDate) {
      var allData = [];
      var dateTo = new Date(infectionDate);
      dateTo.setDate(dateTo.getDate() - 1);
      var dateFrom = new Date(infectionDate);
      dateFrom.setDate(dateFrom.getDate() - 3);
      var url =
        "https://api.covid19api.com/country/" +
        countryName +
        "/status/confirmed/live?from=" +
        dateFrom.toISOString() +
        "&to=" +
        dateTo.toISOString();

      var request = require("request");
      var options = {
        method: "GET",
        url: url,
        headers: {},
      };
      setTimeout(() => {
      request(options, function(error, response) {
        if (error) throw new Error(error);
        var objData = JSON.parse(response.body);
        // var data = objData[objData.length - 1];
        // allData.push({
        //   Country: data.Country,
        //   Cases: data.Cases,
        //   Date: data.Date,
        // });
      });
    }, 60000)

      return allData;
    },
    getTotalCasesAllCountry(infectionDate) {
      var allData = [];
      var i = 0
      var countriesName = this.getCountriesName();
      setTimeout(() => {
      countriesName.forEach((v) => {

        var d = this.getDataByCountryDate(v.Slug, infectionDate);
        allData.push(d[0]);
        console.log(v)
      })        
    }, 2000);
      return allData;
    },
  };

  return handleData;
}

export default fetchDataAPI;
// const getDataByCurrentDate = (exports.getDataByCurrentDate = function getDataByCurrentDate() {
//   var currentDate = new Date();
//   let allTotalCases = [];
//   const countriesName = getCountriesName();
//   console.log(getCountriesName());
//   countriesName.forEach((v) => {
//     allTotalCases.push(getDataByCountryDate(v.Country, currentDate));
//   });
//   return allTotalCases;
// });
