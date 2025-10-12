import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

// We get query as a prop to set the default value of the input field
// so that the input field is pre-filled with the current search term
const SearchForm = ({ query }: { query?:string }) => {
    return (
        // From without method defaults to GET and appends parameters to the URL and update the browser URL
        // in this case we have one input value named "query". So, the URL will be /?query=something
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder="Search Startups"
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <Button type="submit" className="search-btn text-white">
                    <Search className="size-5" />
                </Button>
            </div>
        </Form>
    )
}

export default SearchForm