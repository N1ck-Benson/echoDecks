import axios from "axios";

const getExamples = (lemma, languages) => {
  // Allow CORS extension in use in development
  // -> for production, a proxy server will be required to prevent CORS errors
  const baseUrl = "https://linguee-for-echodecks.herokuapp.com/api/v2/";
  const lemmaForUrl = lemma.includes(" ") ? lemma : lemma.replace(/\s/g, "%20");
  const { src, dst } = languages;
  let url = baseUrl;
  url += `external_sources?query=${lemmaForUrl}&src=${src}&dst=${dst}&guess_direction=false`;

  return axios.get(url).then(({ data, status }) => {
    if (status === 500 || status === 244) {
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
