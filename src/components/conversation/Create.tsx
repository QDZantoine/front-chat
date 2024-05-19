import { Link, Navigate } from "react-router-dom";
import { useCreate } from "../../hooks";
import Form from "./Form";
import { TError } from "../../utils/types";
import TResource from "./type";

interface CreateProps {
  created: TResource | null;
  create: (item: Partial<TResource>) => any;
  error: TError;
  reset: () => void;
  loading: boolean;
}

const CreateView = ({
  create,
  created,
  error,
  reset,
  loading,
}: CreateProps) => {
  if (created) {
    return (
      <Navigate
        to={`/conversations/edit/${encodeURIComponent(created["@id"])}`}
        replace
      />
    );
  }

  return (
    <div>
      <h1>Create Conversation</h1>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {error.message}
        </div>
      )}

      <Form onSubmit={create} error={error} reset={reset} />
      <Link to="/conversations/" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Back to list
      </Link>
    </div>
  );
};

const Create = () => {
  const { created, loading, error, reset, create } = useCreate<TResource>({
    "@id": "conversations",
  });

  return (
    <CreateView
      created={created}
      loading={loading}
      error={error}
      reset={reset}
      create={create}
    />
  );
};

export default Create;
