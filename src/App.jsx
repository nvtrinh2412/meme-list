import './App.scss';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';

const API_RESOURCE = 'https://api.imgflip.com/get_memes';
const MEME_PER_LOADING = 9;
const MAX_MEMES = 100;
const App = () => {
    const [memes, setMemes] = useState([]);
    const [displayMeme, setDisplayMeme] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalMemes, setTotalMemes] = useState(MEME_PER_LOADING);
    const [isMore, setIsMore] = useState(true);
    useEffect(() => {
        const loadMemes = async () => {
            setLoading(true);
            const { data } = await axios.get(API_RESOURCE);
            setMemes(data.data.memes);
            setLoading(false);
        };
        loadMemes();
    }, []);

    const handleLoadingMeme = () => {
        setLoading(true);
        const newTotalMemes = totalMemes + MEME_PER_LOADING;
        setTotalMemes(newTotalMemes);
        const newDisplayMemeList = memes.slice(0, totalMemes);
        setIsMore(newDisplayMemeList.length < MAX_MEMES);
        setDisplayMeme(newDisplayMemeList);
        setLoading(false);
    };
    return (
        <div className="app">
            <div className="app__container">
                <div className="app__click">
                    <Image
                        className="app__click-image"
                        src="images/clickHere.jpg"
                    />
                    <Button
                        className="app__click-btn"
                        variant="success"
                        onClick={() => handleLoadingMeme()}
                        disabled={loading}
                    >
                        {' '}
                        {loading ? 'Loading…' : 'Click to load meme'}
                    </Button>
                </div>
                <div className="app__memes-list">
                    {displayMeme.map((meme) => (
                        <Image src={meme.url} rounded="true" thumbnail fluid />
                    ))}
                </div>
                {displayMeme.length > 0 && isMore && (
                    <Button
                        onClick={() => handleLoadingMeme()}
                        disabled={loading}
                    >
                        {loading ? 'Loading…' : 'Load more'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default App;
