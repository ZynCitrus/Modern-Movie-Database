const api_key = import.meta.env.VITE_API_KEY;

export const fetchRecommended = (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=sv-SE`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
