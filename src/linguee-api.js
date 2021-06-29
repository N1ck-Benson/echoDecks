import axios from "axios";

// The Linguee API is contacted *before* the echoDecks API
// creates the flashcards.
// This request is used to confirm the existence of examples and
// translations for the given vocab, and egs and translations are stored for
// posting to the echoDecks server.
// NOTE: error messages are handled but not displayed to the user yet.

const getExamples = (lemma, languages) => {
  // "Allow CORS" extension needs to be used in development.
  // For production, a proxy server will be required to prevent CORS errors
  const baseUrl = "https://linguee-for-echodecks.herokuapp.com/api/v2/";
  const lemmaForUrl = lemma.includes(" ") ? lemma : lemma.replace(/\s/g, "%20");
  const { src, dst } = languages;
  let url = baseUrl;
  url += `external_sources?query=${lemmaForUrl}&src=${src}&dst=${dst}&guess_direction=false`;

  return axios.get(url).then(({ data, status }) => {
    const errorCodes = [500, 244, 400];
    if (errorCodes.includes(status)) {
      return "Sorry, something went wrong";
    } else if (status === 244) {
      return data.detail.msg;
    }
    const examples = data.map((example) => {
      const { src, dst } = example;
      return {
        lemma,
        src,
        dst,
        isLearned: false,
      };
    });
    const trimmedExamples = examples.slice(0, 4);
    return trimmedExamples;
  });
};

export default getExamples;
