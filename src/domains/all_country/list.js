const axios = require("../../utils/axios");
const R = require("ramda");

const list_covid19_all_country = async (country, lastdays) => {
  try {
    let _listData = [];
    let amount_covid19 = 0;
    let amount_deads = 0;
    let amount_recovered = 0;
    let date = [];

    for (let key in country) {
      const resp = await axios(`GET`, `/${country[key]}?lastdays=${lastdays}`);

      if (!R.isNil(resp.data.timeline) || !R.isEmpty(resp.data.timeline)) {
        date = Object.keys(resp.data.timeline.cases);
        if (resp.status === 200) {
          const cases = Object.values(resp.data.timeline.cases);
          for (let index in cases) {
            amount_covid19 += cases[index];
          }

          const deaths = Object.values(resp.data.timeline.deaths);
          for (let index in deaths) {
            amount_deads += cases[index];
          }

          const recovered = Object.values(resp.data.timeline.recovered);
          for (let index in recovered) {
            amount_recovered += cases[index];
          }

          _listData.push({
            country: resp.data.country,
            cases: amount_covid19,
            deaths: amount_deads,
            recovered: amount_recovered,
          });
        }
        amount_covid19 = 0;
      }
    }

    if (_listData) {
      const byCases = R.descend(R.prop("cases"));
      const ascendSort = R.sort(byCases, _listData);
      _listData = ascendSort;
    }
    return { data: _listData, date: date[0] };
  } catch (error) {
    console.log("error from list_covid19_US", error);
    return error;
  }
};

module.exports = list_covid19_all_country;
