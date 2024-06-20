const api_key = import.meta.env.VITE_API_KEY;

export const topMovies = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=sv-SE",
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getMovieDetails = (movieId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmFkODQ1Y2ViMTNlYWI0ZDA1YzM0ZWZlNGE3M2ZmOCIsInN1YiI6IjY1ZDEwMjg0ZGI3MmMwMDE0NzM4NzBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iOOvPNpy5sFIWam2YX9zx9MY69x_V1pJ1RU9MIpVdAA",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=se-SV`,
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
