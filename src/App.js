import Router from "./component/Router";
import Header from "./component/Header";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <div className="container">
          <div className="mt-5 mx-auto mw-xs">
            <Router />
          </div>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
