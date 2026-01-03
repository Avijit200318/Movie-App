// the fetch function that we will provide here this will be fetchMovies or any other function. and this hook will help us to handle all of this fetching, loading, error states.

import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetchFunction();
            setData(res);
        } catch (error) {
            setError(error instanceof Error ? error : new Error("An error occur"));
        } finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }


    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, []);

    // hook have to return something
    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch