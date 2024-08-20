const api_key = import.meta.env.VITE_API_KEY;

export const fetchRecommended = async (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=sv-SE`,
      options
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch recommendations:", err);
    throw err;
  }
};
