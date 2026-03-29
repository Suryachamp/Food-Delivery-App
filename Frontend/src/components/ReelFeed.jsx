import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Bookmark, MessageCircle, Play, Volume2, VolumeX, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonLoader = () => (
  <div className="h-screen w-full bg-[#09090b] flex flex-col p-6 gap-6 overflow-hidden">
    <div className="flex-1 w-full rounded-3xl bg-white/5 animate-pulse" />
    <div className="flex flex-col gap-3">
      <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-white/5 animate-pulse" />
    </div>
    <div className="flex gap-4 self-end">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
      ))}
    </div>
  </div>
);

const VideoCard = ({ video, onLike, onSave, cardId }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let playPromise;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.then(() => setIsPlaying(true))
              .catch(e => console.log('Playback buffering aborted cleanly:', e.message));
          }
        } else {
          if (playPromise !== undefined) {
            playPromise.then(() => {
              videoElement.pause();
              setIsPlaying(false);
            }).catch(() => { });
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(videoElement);
    return () => observer.unobserve(videoElement);
  }, []);

  const handleVideoTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      handleDoubleTapLike();
    } else {
      setTimeout(() => {
        if (Date.now() - now >= DOUBLE_PRESS_DELAY) {
          togglePlayPause();
        }
      }, DOUBLE_PRESS_DELAY);
    }
    setLastTap(now);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Playback failed:", e));
      }
    }
  };

  const handleDoubleTapLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
    onLike(video);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${video.name}`,
          text: video.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("User closed share payload:", err);
      }
    } else {
      alert("Sharing APIs are not globally supported via this web browser.");
    }
  };

  return (
    <div id={cardId} className="h-screen w-full snap-start relative flex justify-center items-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.video || video.videoUrl || video.url}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onClick={handleVideoTap}
        style={{ cursor: 'pointer' }}
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-[15] pointer-events-none"
          >
            <button
              className="pointer-events-auto bg-black/40 border border-white/10 rounded-full p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation(); 
                setIsMuted(!isMuted);
              }}
            >
              {isMuted ? <VolumeX size={15} strokeWidth={1.5} /> : <Volume2 size={20} strokeWidth={1.5} />}
            </button>

            <button className="pointer-events-auto bg-black/40 rounded-full p-3.5 flex items-center justify-center backdrop-blur-md text-white border border-white/10 transition-all hover:scale-110 hover:bg-black/60" 
              onClick={(e) => {
                e.stopPropagation(); 
                togglePlayPause();
              }}>
              <Play size={20} fill="currentColor" color="white" style={{ marginLeft: '4px' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20] pointer-events-none"
          >
            <Heart size={100} fill="#e51d38" stroke="white" strokeWidth={1} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-6 pt-10 pb-[85px] bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white z-10 flex flex-row justify-between items-end pointer-events-none">

        <div className="flex flex-col gap-3 max-w-[70%] pointer-events-auto">
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-medium m-0 leading-relaxed tracking-tight line-clamp-2 drop-shadow-md"
          >
            {video.description}
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-full font-bold text-[11px] cursor-pointer self-start transition-all duration-300 backdrop-blur-md hover:bg-primary-gradient hover:border-transparent hover:shadow-[0_5px_15px_rgba(229,29,56,0.4)] capitalize tracking-wider" 
            onClick={() => navigate(`/profile/${video.foodPartner}`)}
          >
            visit store
          </motion.button>
        </div>

        <div className="flex flex-col gap-5 items-center pb-[5px] pointer-events-auto">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-none border-none text-white text-[10px] font-bold cursor-pointer flex flex-col items-center gap-1.5" onClick={() => onLike(video)}>
            <div className="p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Heart size={22} strokeWidth={2} fill={video.likeCount > 0 ? '#e51d38' : 'none'} color={video.likeCount > 0 ? '#e51d38' : '#fff'} />
            </div>
            <span className="drop-shadow-lg font-extrabold">{video.likeCount || 0}</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-none border-none text-white text-[10px] font-bold cursor-pointer flex flex-col items-center gap-1.5" onClick={() => onSave(video)}>
            <div className="p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Bookmark size={22} strokeWidth={2} fill={video.savesCount > 0 ? '#f59e0b' : 'none'} color={video.savesCount > 0 ? '#f59e0b' : '#fff'} />
            </div>
            <span className="drop-shadow-lg font-extrabold">{video.savesCount || 0}</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-none border-none text-white text-[10px] font-bold cursor-pointer flex flex-col items-center gap-1.5" onClick={() => alert("Comments UI pipeline coming soon!")}>
            <div className="p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <MessageCircle size={22} strokeWidth={2} color="#fff" />
            </div>
            <span className="drop-shadow-lg font-extrabold">{video.commentCount || 0}</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-none border-none text-white text-[10px] font-bold cursor-pointer flex flex-col items-center gap-1.5" onClick={handleShare}>
            <div className="p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Share2 size={22} strokeWidth={2} color="#fff" />
            </div>
            <span className="drop-shadow-lg text-lowercase font-extrabold">share</span>
          </motion.button>
        </div>

      </div>
    </div>
  )
}

const ReelFeed = ({ items, onLike, onSave, emptyMessage }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate premium loading experience
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scrollToVideoId = location.state?.scrollToVideoId;
    if (scrollToVideoId && items?.length > 0) {
      const element = document.getElementById(`video-${scrollToVideoId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.state, items]);

  if (loading) {
    return (
      <div className="h-screen w-full no-scrollbar overflow-y-auto snap-y snap-mandatory bg-black">
        <SkeletonLoader />
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-sm"
      >
        {emptyMessage || "No videos available."}
      </motion.div>
    );
  }

  return (
    <div className="h-screen w-full no-scrollbar overflow-y-auto snap-y snap-mandatory bg-black">
      {items.map((video) => (
        <VideoCard
          key={video._id || video.id}
          cardId={`video-${video._id || video.id}`}
          video={video}
          onLike={onLike}
          onSave={onSave}
        />
      ))}
    </div>
  )
}

export default ReelFeed;
