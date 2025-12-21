
import { useEffect, useState } from "react";
import TemplateMovieListPage from "../components/templateMovieListPage";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import { getPopularMovies } from "../api/tmdb-api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // initial load: popular movies
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(1);
        if (!active) return;
        setMovies(data.results || []);
      } catch (e) {
        if (!active) return;
        setErr(e.message || "Failed to load movies");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);


  if (loading) return <Spinner />;
  if (err) return <p style={{ color: "red", padding: 12 }}>Error: {err}</p>;

  return (
    <TemplateMovieListPage>
    
      <MovieList movies={movies} />
    </TemplateMovieListPage>
  );
}
