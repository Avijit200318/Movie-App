export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_AUTHENTICATION_KEY}`
  }
}

export const fetchPopularMovies = async () => {
    try {
        const res = await fetch(`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });

        if(!res.ok){
            throw new Error("Failed to fetch movies: ", res.statusText);
        }

        const data = await res.json();

        // based on api docs
        return data.results;
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
}