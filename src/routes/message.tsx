import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../components/message/";

const routes = [
  <Route path="/messages/create" element={<Create />} key="create" />,
  <Route path="/messages/edit/:id" element={<Update />} key="update" />,
  <Route path="/messages/show/:id" element={<Show />} key="show" />,
  <Route path="/messages" element={<List />} key="list" />,
  <Route path="/messages/:page" element={<List />} key="page" />,
];

export default routes;
