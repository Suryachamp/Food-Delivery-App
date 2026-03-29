import React, { useState, useEffect } from 'react';
import ReelFeed from '../../components/ReelFeed';
import BottomNav from '../../components/BottomNav';
import api from '../../api/api';

const Home = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await api.get('/api/food/get-all-foods');
                setFoods(response.data.foods);
            } catch (error) {
                console.error("Error fetching foods", error);
            }
        };
        fetchFoods();
    }, []);

    const handleLike = async (video) => {
        try {
            await api.post(`/api/food/like/${video._id}`);
            setFoods(prev => prev.map(f => f._id === video._id ? { ...f, likeCount: (f.likeCount || 0) + 1 } : f));
        } catch (error) {
            console.error("Like failed", error);
        }
    };

    const handleSave = async (video) => {
        try {
            await api.post(`/api/food/save/${video._id}`);
            setFoods(prev => prev.map(f => f._id === video._id ? { ...f, savesCount: (f.savesCount || 0) + 1 } : f));
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    return (
        <>
            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                emptyMessage="No videos available."
            />
            <BottomNav />
        </>
    )
}

export default Home