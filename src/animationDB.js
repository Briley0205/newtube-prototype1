//animation db
import axios from "axios";

let trendingAnime = [];
const headers = {
    "content-type": "application/json",
    "Accept": "applicatoin/json",
}
let variables = {
    page: 1,
    perpage: 5,
}
const gqlQuery = `
query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          siteUrl
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
          episodes
          genres
      }
}
}`;
const result = async() => {
    try {
        await axios.post("https://graphql.anilist.co", {
            headers,
            variables,
            query: gqlQuery,
        }).then((result) => console.log(result.data.data.Page.media))
    } catch(err) {
        return console.log(err.message);
    } 
}
result();


  /**
   * hashtag
            recommendations
            staff
            streamingEpisodes
            studios
            trailer
const Anilist  = require('anilist-node');
const anilist = new Anilist();

anilist.media.anime(132405).then(data => {
    console.log(data.title);
})
let myFilter = {
    isAdult: false,
};

anilist.searchEntry.anime(null, myFilter, 1, 10).then((data) => {
    console.log(data);
});
Anilist.media.anime(21708).then(data => {
    console.log(data);
}); */
