import { Client, ID, Query, TablesDB } from "react-native-appwrite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const tables = new TablesDB(client);

// 1. track the searches made by user

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await tables.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal("searchTerm", query)],
        });
    
        if (result.total > 0) {
            const existingMovie = result.rows[0];
    
            await tables.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingMovie.$id,
                data: {
                    count: (existingMovie.count ?? 0) + 1,
                }
            })
        } else {
            await tables.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            })
        }
    } catch (error) {
        console.log("Appwrie route error", error);
        throw error;
    }
}

// 2. 