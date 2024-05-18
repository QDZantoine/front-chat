import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../components/conversation/";

const routes = [
  <Route path="/conversations/create" element={<Create />} key="create" />,
  <Route path="/conversations/edit/:id" element={<Update />} key="update" />,
  <Route path="/conversations/show/:id" element={<Show />} key="show" />,
  <Route path="/conversations" element={<List />} key="list" />,
  <Route path="/conversations/:page" element={<List />} key="page" />,
];

export default routes;
