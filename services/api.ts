export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_AUTHENTICATION_KEY}`
    }
}

export const fetchPopularMovies = async ({ query }: { query: string }): Promise<Movie[]> => {
    try {
        const endpoint = query
            ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const res = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch movies: ${res.statusText}`);
        }

        const data = await res.json();

        // based on api docs
        return data.results;
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
    return [];
}