const axios = require("axios");

const fetchMovie = async (movieTitle) => {
    let response = await axios.get(`http://www.omdbapi.com/?apikey=124303e6&t=${movieTitle}`);
    if(response.data.Response != "False") {
        return {
            title: response.data.Title,
            released: response.data.Year,
            genre: response.data.Genre,
            director: response.data.Director
        }
    }
    else return null;
};
module.exports = fetchMovie;