import { Link, Navigate, useParams } from "react-router-dom";
import Links from "../Links";
import { useRetrieve, useDelete } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";
import { Button, Spinner } from "flowbite-react";

interface ShowProps {
  retrieved: TResource | null;
  loading: boolean;
  error: TError;
  deleteError: TError;
  deleted: TResource | null;
  del: (item: TResource) => any;
}

const ShowView = ({
  del,
  deleteError,
  deleted,
  error,
  loading,
  retrieved: item,
}: ShowProps) => {
  if (deleted) {
    return <Navigate to="/conversations/" replace />;
  }

  const delWithConfirm = () => {
    if (item && window.confirm("Are you sure you want to delete this item?")) {
      del(item);
    }
  };

  return (
    <div>
      <h1>Show Conversation {item && item["@id"]}</h1>

      {loading && (
        <div className="flex justify-center mb-2"> <Button color="gray">
        <Spinner aria-label="Alternate spinner button example" size="md" />
        <span className="pl-3">Loading...</span>
      </Button></div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {error.message}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {deleteError.message}
        </div>
      )}

      {item && (
        <table className="table table-responsive table-striped table-hover">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">createdAt</th>
              <td>{item["createdAt"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">nbMessages</th>
              <td>{item["nbMessages"]}retrieved</td>
            </tr>
            <tr>
              <th scope="row">user</th>
              <td>
                <Links
                  items={{
                    href: `/users/show/${encodeURIComponent(item["user"])}`,
                    name: item["user"],
                  }}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">bot</th>
              <td>
                <Links
                  items={{
                    href: `/users/show/${encodeURIComponent(item["bot"])}`,
                    name: item["bot"],
                  }}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">messages</th>
              <td>
                <Links
                  items={item["messages"].map((ref: any) => ({
                    href: `/messages/show/${encodeURIComponent(ref)}`,
                    name: ref,
                  }))}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <Link to="/conversations/" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Back to list
      </Link>
      {item && (
        <Link to={`/conversations/edit/${encodeURIComponent(item["@id"])}`}>
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit</button>
        </Link>
      )}
      <button onClick={delWithConfirm} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete
      </button>
    </div>
  );
};

const Show = () => {
  const { id } = useParams<{ id: string }>();
  const { retrieved, loading, error } = useRetrieve<TResource>(
    decodeURIComponent(id || "")
  );
  const { deleted, error: deleteError, del } = useDelete<TResource>();

  return (
    <ShowView
      retrieved={retrieved}
      loading={loading}
      error={error}
      deleteError={deleteError}
      deleted={deleted}
      del={del}
    />
  );
};

export default Show;
