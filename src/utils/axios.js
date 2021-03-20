// import axios from "axios";
const axios = require("axios");

/**
 *
 * @param {String} method //method for query -> GET,POST,PUT,DELETE
 * @param {String} pathUrl // path
 * @param {String} body //query command
 * @param {Boolean} isTestScript //Is use from test script?
 * @returns
 */
const fetchData = async (method, pathUrl, body) => {
  try {
    const url = "https://disease.sh/v3/covid-19/historical";
    const resp = await axios({
      url: `${url}${pathUrl}`,
      data: body,
      method,
      headers: {
        //  "Access-Control-Allow-Origin": "*",
        //  'Access-Control-Allow-Headers': 'Set-Cookie'
        // Authorization: Cookies.get("tokenAccess"),
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};
module.exports = fetchData;
