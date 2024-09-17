import { TopNavigation } from "../Menu/TopNavigation";

export function NewPortfolio() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-full flex flex-col">
          <TopNavigation />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Create a new portfolio</h1>
            <div className="w-1/4 mt-8">
              <label
                htmlFor="portfolio-name"
                className="block text-sm font-medium text-gray-700"
              >
                Portfolio Name
              </label>
              <input
                type="text"
                name="portfolio-name"
                id="portfolio-name"
                autoComplete="off"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="reset"
              className="mt-4 bg-gray-500 text-white p-2 rounded-md"
            >
              Reset
            </button>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded-md">
              Create Portfolio
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
