export const getPosts = async () => {
    try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}