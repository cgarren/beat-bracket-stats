const baseUrl = process.env.NEXT_PUBLIC_BACKEND_HOST;

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
