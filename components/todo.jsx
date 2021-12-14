export const Todo = ({ item, closeDetails, removeTodo }) => {

    const {title, details, id} = item

    return (
      <details
        key={id}
        onClick={closeDetails}
        className="p-4 my-3 font-light rounded open:ring-2 open:ring-lime-600 open:shadow-lg bg-zinc-800 "
      >
        <summary
          id={id}
          className="font-bold text-lg flex justify-between p-2"
        >
          <div>{title}</div>
          <button
            onClick={removeTodo}
            className="text-xs bg-lime-600 p-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </summary>
        <h4 className="font-medium mt-5 mb-2">Details:</h4>
        <div className=" bg-zinc-700 p-3 rounded border border-zinc-600">
          <p>{details}</p>
        </div>
      </details>
    );
}