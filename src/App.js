/* Modules */
import { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* Components */
import { authOperations } from './redux/auth';
import Container from './components/Container';
import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

/* Styles */

const HomeView = lazy(() => import('./view/HomeView'));
const RegisterView = lazy(() => import('./view/RegisterView'));
const LoginView = lazy(() => import('./view/LoginView'));
const ContactsView = lazy(() => import('./view/ContactsView'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomeView />
          </PublicRoute>

          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterView />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginView />
          </PublicRoute>

          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsView />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Container>
  );
}

// /* Modules */
// import { Component, Suspense, lazy } from 'react';
// import { Switch } from 'react-router-dom';
// import { connect } from 'react-redux';

// /* Components */
// import { authOperations } from './redux/auth';
// import Container from './components/Container';
// import AppBar from './components/AppBar';
// import PrivateRoute from './components/PrivateRoute';
// import PublicRoute from './components/PublicRoute';

// /* Styles */

// const HomeView = lazy(() => import('./view/HomeView'));
// const RegisterView = lazy(() => import('./view/RegisterView'));
// const LoginView = lazy(() => import('./view/LoginView'));
// const ContactsView = lazy(() => import('./view/ContactsView'));

// class App extends Component {
//   componentDidMount() {
//     this.props.onGetCurrentUser();
//   }

//   render() {
//     return (
//       <Container>
//         <AppBar />

//         <Suspense fallback={<p>Loading...</p>}>
//           <Switch>
//             <PublicRoute exact path="/" component={HomeView} />
//             <PublicRoute
//               path="/register"
//               restricted
//               redirected="/contacts"
//               component={RegisterView}
//             />
//             <PublicRoute
//               path="/login"
//               restricted
//               redirectTo="/contacts"
//               component={LoginView}
//             />
//             <PrivateRoute
//               path="/contacts"
//               redirectTo="/login"
//               component={ContactsView}
//             />
//           </Switch>
//         </Suspense>
//       </Container>
//     );
//   }
// }

// const mapDispatchToProps = {
//   onGetCurrentUser: authOperations.getCurrentUser,
// };

// export default connect(null, mapDispatchToProps)(App);
