// import { Route, Redirect } from "react-router-dom";

// function ProtectedRoute({ isLoggedIn, children, ...props }) {
//   return (
//     <Route {...props}>
//       { isLoggedIn ? children : <Redirect to="/login" /> }
//     </Route>
//   )
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
