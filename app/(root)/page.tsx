import SearchForm from "@/components/SearchForm"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams?: Promise<{ query?: string }> }) {
  const query =  (await searchParams)?.query
  const posts = await(client.fetch(STARTUPS_QUERY))

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 89,
  //     author: { _id: 1, name: "John Doe" },
  //     _id: 1,
  //     description: 'This is a sample description',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKpJMRR6BJB8swraXu0wPQ2_50Y6x2wsEEaQ&s',
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )
          }
        </ul>
      </section>
    </>
  );
}
