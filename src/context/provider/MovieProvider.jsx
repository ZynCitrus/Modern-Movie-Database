export const topMovies = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmFkODQ1Y2ViMTNlYWI0ZDA1YzM0ZWZlNGE3M2ZmOCIsInN1YiI6IjY1ZDEwMjg0ZGI3MmMwMDE0NzM4NzBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iOOvPNpy5sFIWam2YX9zx9MY69x_V1pJ1RU9MIpVdAA",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=se-SV",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const searchMovie = (searchQuery) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmFkODQ1Y2ViMTNlYWI0ZDA1YzM0ZWZlNGE3M2ZmOCIsInN1YiI6IjY1ZDEwMjg0ZGI3MmMwMDE0NzM4NzBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iOOvPNpy5sFIWam2YX9zx9MY69x_V1pJ1RU9MIpVdAA",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
