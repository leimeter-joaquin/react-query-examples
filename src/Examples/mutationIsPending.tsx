import {
  useActivateHeadingMutation,
  useDisableHeadingMutation,
} from "../services/headings/mutations";
import { useHeadingsQuery } from "../services/headings/queries";

function MutationIsPending() {
  const activateHeadingMutation = useActivateHeadingMutation();
  const deActivateHeadingMutation = useDisableHeadingMutation();
  const query = useHeadingsQuery();

  return (
    <div style={{ margin: "1rem" }}>
      <p>
        Press the buttons to do a mutation, press one then the other so it does
        not fail. you'll get it.
      </p>
      <p>
        Notice the the mutation is pending during the PATCH AND the GET request.
      </p>
      <p>
        It is recommended to use the network setting to slow down the connection
        to "slow 3G" to see the situation more clearly.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <button
          onClick={() =>
            activateHeadingMutation.mutate("656d68c215958bcced35e7f6")
          }
        >
          mutate
        </button>
        <button
          onClick={() =>
            deActivateHeadingMutation.mutate("656d68c215958bcced35e7f6")
          }
        >
          mutate
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "0.5rem",
        }}
      >
        <div>
          {(activateHeadingMutation.isPending ||
            deActivateHeadingMutation.isPending) &&
            "Mutation is pending"}
        </div>
        <div>{query.isFetching && "Query is fetching"}</div>
      </div>
    </div>
  );
}

export default MutationIsPending;
