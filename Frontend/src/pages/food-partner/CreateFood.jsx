import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, X, Check } from 'lucide-react';
import axios from 'axios';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (video) {
      const objectUrl = URL.createObjectURL(video);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [video]);

  const isDisabled = useMemo(() => !name.trim() || !video || isSubmitting, [name, video, isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', video);

      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Upload Successful!');
      setName('');
      setDescription('');
      setVideo(null);
      navigate('/');
    } catch (error) {
      console.error('Upload Error:', error);
      alert(error.response?.data?.message || 'Failed to upload reel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/food-partner/logout', { withCredentials: true });
      navigate('/food-partner/login');
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black font-sans transition-all duration-400 relative">
      <button 
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-white/85 dark:bg-[#121214]/80 border border-white/30 dark:border-white/5 
                   text-[#e51d38] px-4 py-2.5 rounded-full flex items-center gap-2 z-10 cursor-pointer text-[13px] 
                   font-bold backdrop-blur-md shadow-lg transition-transform hover:scale-105 lowercase"
      >
        <LogOut size={18} strokeWidth={2.5} />
        <span>logout</span>
      </button>

      <div className="w-[500px] max-w-full bg-white/85 dark:bg-[#121214]/80 text-black dark:text-white rounded-xl shadow-xl p-8 backdrop-blur-md flex flex-col gap-6 border border-white/30 dark:border-white/5 relative overflow-hidden">
        {/* Premium Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] opacity-60"></div>

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1.5">Upload New Meal</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Share your latest culinary creation</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Meal Name</label>
            <input 
              type="text" 
              placeholder="e.g. Spicy Chicken Tikka" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Description</label>
            <textarea 
              placeholder="Describe your meal..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="p-3 px-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111113] text-black dark:text-white text-sm outline-none transition-all focus:border-[#e51d38] focus:ring-4 focus:ring-[#e51d38]/10 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold ml-0.5">Video Reel</label>
            
            {!video ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="group border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-[#e51d38]/40 hover:bg-[#e51d38]/5"
              >
                <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:text-[#e51d38] group-hover:bg-[#e51d38]/10 transition-colors">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Click to upload video</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">MP4, WebM or Ogg (Max 100MB)</p>
                </div>
                <input 
                  type="file" 
                  accept="video/*"
                  onChange={(e) => { if (e.target.files[0]) setVideo(e.target.files[0]); }}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111113] p-3 rounded-lg border border-gray-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-[#e51d38]/10 flex items-center justify-center text-[#e51d38]">
                    <Check size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate pr-2">{video.name}</p>
                    <p className="text-[11px] text-gray-500 uppercase font-bold tracking-tight">video selected</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setVideo(null)}
                    className="p-2 text-gray-400 hover:text-[#e51d38] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {previewUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                    <video 
                      src={previewUrl} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isDisabled}
            className={`mt-4 w-full p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
              ${isDisabled 
                ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-[#e51d38] to-[#ff4d5a] text-white shadow-[0_10px_20px_rgba(229,29,56,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(229,29,56,0.4)] active:translate-y-0 cursor-pointer'
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <span>Publish Reel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;