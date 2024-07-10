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
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=sv-SE`,
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

export const getMovieByID = (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/${id}?language=sv-SE",
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
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchQuery)}&language=sv-SE`,
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
