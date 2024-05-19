import { Link, Navigate, useParams } from "react-router-dom";
import Form from "./Form";
import { useDelete, useRetrieve, useUpdate } from "../../hooks";
import TResource from "./type";
import { TError } from "../../utils/types";

interface UpdateProps {
  retrieved: TResource | null;
  retrieveLoading: boolean;
  retrieveError: TError;
  updateLoading: boolean;
  updateError: TError;
  deleteLoading: boolean;
  deleteError: TError;
  created: TResource | null;
  updated: TResource | null;
  deleted: TResource | null;
  del: (item: TResource) => any;
  update: (item: TResource, values: Partial<TResource>) => any;
  reset: () => void;
}

const UpdateView = ({
  created,
  del,
  deleteError,
  deleteLoading,
  deleted,
  retrieveError,
  retrieveLoading,
  retrieved,
  update,
  updateError,
  updateLoading,
  updated,
  reset,
}: UpdateProps) => {
  if (deleted) {
    return <Navigate to="/messages/" replace />;
  }

  const item = updated ? updated : retrieved;
  const delWithConfirm = () => {
    if (
      retrieved &&
      window.confirm("Are you sure you want to delete this item?")
    ) {
      del(retrieved);
    }
  };

  return (
    <div>
      <h1>Edit Message {item && item["@id"]}</h1>

      {created && (
        <div className="alert alert-success" role="status">
          {created["@id"]} created.
        </div>
      )}
      {updated && (
        <div className="alert alert-success" role="status">
          {updated["@id"]} updated.
        </div>
      )}
      {(retrieveLoading || updateLoading || deleteLoading) && (
        <div className="alert alert-info" role="status">
          Loading...
        </div>
      )}
      {retrieveError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {retrieveError.message}
        </div>
      )}
      {updateError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {updateError.message}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
          {deleteError.message}
        </div>
      )}

      {item && (
        <Form
          onSubmit={(values) => {
            reset();
            update(item, values);
          }}
          error={updateError}
          reset={reset}
          initialValues={item}
        />
      )}
      <Link to="/messages/" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Back to list
      </Link>
      <button onClick={delWithConfirm} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete
      </button>
    </div>
  );
};

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const {
    retrieved,
    loading: retrieveLoading,
    error: retrieveError,
  } = useRetrieve<TResource>(decodeURIComponent(id || ""));
  const {
    updated,
    update,
    reset,
    loading: updateLoading,
    error: updateError,
  } = useUpdate<TResource>();
  const {
    deleted,
    loading: deleteLoading,
    error: deleteError,
    del,
  } = useDelete<TResource>();

  return (
    <UpdateView
      retrieved={retrieved}
      retrieveLoading={retrieveLoading}
      retrieveError={retrieveError}
      updateLoading={updateLoading}
      updateError={updateError}
      deleteLoading={deleteLoading}
      deleteError={deleteError}
      created={null}
      updated={updated}
      deleted={deleted}
      del={del}
      update={update}
      reset={reset}
    />
  );
};

export default Update;
