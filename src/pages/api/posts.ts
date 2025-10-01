
// runs as SSR which avoids sending api key to client
export async function GET() {
  const apiKey = import.meta.env.STRAPI_READ_KEY;
  const endpoint = "https://api.mgut.ca/api/blog-posts";

  if (!apiKey) {
    console.error("STRAPI_READ_KEY is not set in .env file");
    return new Response(
      JSON.stringify({ message: "Server config error." }),
      { status: 500 }
    );
  }

  const bearer = 'Bearer ' + apiKey;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'Authorization': bearer
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } 
  catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred while fetching posts." }),
      { status: 500 }
    );
  }
}