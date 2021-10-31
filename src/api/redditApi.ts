import axios from "axios";
import { Post } from "./post";

export const getApi = async (after?: string): Promise<any> => {
    const data = await axios("https://api.reddit.com/r/programminghorror" + (after ? `?after=${after}` : ""));
    return data["data"]
};

export const getPosts = async (after?: string) => {
    const apiData = await getApi(after);
    return {posts: apiData["data"]["children"], after: apiData["after"]}
}

export const convertToPost = (data: any) => {
    return new Post(data["url"], data["title"])
}
