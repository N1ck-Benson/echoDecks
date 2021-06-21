import axios from "axios";

const getExamples = (vocab, languages) => {
  // Allow CORS extension in use in development
  // -> for production, a proxy server will be required to prevent CORS errors
  const baseUrl = "https://linguee-for-echodecks.herokuapp.com/api/v2/";
  const vocabForUrl = vocab.replace(/\s/g, "%20");
  const { src, dst } = languages;
  let url = baseUrl;
  url += `external_sources?query=${vocabForUrl}&src=${src}&dst=${dst}&guess_direction=false`;

  return axios.get(url).then(({ data, status }) => {
    if (status === 500) {
      return data;
    } else if (status === 244) {
      return data.detail.msg;
    }
    const examples = data.map((example) => {
      const { src, dst } = example;
      return {
        src,
        dst,
      };
    });
    return examples;
  });
};

export default getExamples;
