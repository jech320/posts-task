import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from 'components';
import { PostPage, PostsPage } from 'pages';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              path="posts"
              element={<PostsPage />}
            />
            <Route
              path="posts/:postId"
              element={<PostPage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
