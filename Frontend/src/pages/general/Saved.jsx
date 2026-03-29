import React, { useState, useEffect } from 'react';
import ReelFeed from '../../components/ReelFeed';
import BottomNav from '../../components/BottomNav';
import api from '../../api/api';
import { Bookmark } from 'lucide-react';

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await api.get('/api/food/get-saved-foods');
        setVideos(response.data.savedFoods || []);
      } catch (error) {
        console.error("Error fetching saved foods", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  async function likeVideo(item) {
    try {
      await api.post(`/api/food/like/${item._id}`);
    } catch (error) {
      console.error("Like failed", error);
    }
  }

  async function saveVideo(item) {
    const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true });
    if (response.data.message !== "Food saved successfully") {
      setVideos((prev) => prev.filter((v) => v._id !== item._id));
    }
  }

  if (loading) {
    return <div className="h-screen bg-black text-white flex items-center justify-center font-sans uppercase tracking-widest font-bold">Loading...</div>;
  }

  return (
    <>
      <div className="h-screen w-full bg-black overflow-hidden relative">
        {videos.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center gap-5 p-10">
            <div className="p-6 rounded-full bg-white/5 border border-white/10 text-gray-500">
              <Bookmark size={48} strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">No Saved Videos</h2>
              <p className="text-sm text-gray-500 max-w-[250px] leading-relaxed">
                When you bookmark a recipe, it will appear here in your private collection.
              </p>
            </div>
          </div>
        ) : (
          <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
          />
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default Saved;
