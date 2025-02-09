import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const mbtiTypes = [
  "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ESTJ", "ESTP", "ISFJ", "ISFP", "ESFJ", "ESFP"
];

const movies = {
  "INTJ": [{ genre: "Sci-Fi", suggestion: "Inception", image: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" },
            { genre: "Sci-Fi", suggestion: "Interstellar", image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" }],
  "ENTP": [{ genre: "Comedy", suggestion: "The Wolf of Wall Street", image: "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg" },
            { genre: "Comedy", suggestion: "Superbad", image: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg" }],
  // Tambahkan semua 16 jenis MBTI dengan rekomendasi film di sini
};

export default function MovieRecommender() {
  const [page, setPage] = useState("welcome");
  const [mbti, setMbti] = useState("");
  const [age, setAge] = useState("");
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = () => {
    if (movies[mbti]) {
      setRecommendations(movies[mbti]);
      setPage("result");
    } else {
      setRecommendations([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white">
      {page === "welcome" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl font-bold mb-6">Selamat Datang di Movie Recommender</h1>
          <p className="text-lg">Temukan film terbaik berdasarkan kepribadianmu!</p>
          <Button className="mt-4 bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:shadow-lg" onClick={() => setPage("form")}>Mulai</Button>
        </motion.div>
      )}

      {page === "form" && (
        <Card className="w-full max-w-md p-6 bg-white text-gray-900 shadow-xl rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-bold mb-4 text-center">Dapatkan Rekomendasi Film!</h2>
            <Select onValueChange={setMbti}>
              <SelectTrigger className="mb-2">Pilih MBTI Anda</SelectTrigger>
              <SelectContent>
                {mbtiTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Usia" className="mb-2" onChange={(e) => setAge(e.target.value)} />
            <Input type="text" placeholder="Mood Anda" className="mb-2" onChange={(e) => setMood(e.target.value)} />
            <Input type="text" placeholder="Genre Favorit" className="mb-2" onChange={(e) => setGenre(e.target.value)} />
            <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 rounded-lg hover:shadow-lg">Dapatkan Rekomendasi</Button>
          </CardContent>
        </Card>
      )}

      {page === "result" && recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-center">Rekomendasi Film:</h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {recommendations.map((movie, index) => (
              <div key={index} className="text-center">
                <img src={movie.image} alt={movie.suggestion} className="w-full rounded-lg shadow-md" />
                <p className="mt-2 font-bold">{movie.suggestion}</p>
                <p className="text-sm text-gray-700">Genre: {movie.genre}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
