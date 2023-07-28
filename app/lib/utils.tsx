export const baseUrl =
    "https://7kuod6yycitu3dlcmuqc4ww3qu0zjoru.lambda-url.us-east-2.on.aws";

async function fetcher(url: string, method: string = "GET", body: any = null) {
    const res = await fetch(url, {
        method: method,
        body: body,
    });
    const data = await res.json();
    return data;
}

export async function getUsers() {
    const users = await fetcher(`${baseUrl}/users`);
    return users;
}
