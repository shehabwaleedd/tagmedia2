const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN



export async function fetchEntries() {
    const req = await fetch(`https://cdn.contentful.com/spaces/${space}/environments/master/entries/KaA7yfli9UsX38W5YB8PI?access_token=${accessToken}`, {cache: 'no-cache'})
    const data = await req.json()
    return data

}


