import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import utils from '../services/utils';
import office from '../unsplashdefaultdata/officequery';

const SplashMenu = ({ perpage, setImageUrl, board, user, updateBoard }) => {
    const [splashImagesUrls, setSplashImagesUrls] = useState(office);
    const [filterByName, setFilterByName] = useState('');

    const inputChange = (ev) => {
        setFilterByName(ev.target.value);
    };

    const onSave = async () => {
        try {
            const splashImages = await utils.getImagesFromUnsplash(filterByName, perpage || 20);
            const newUrls = [];
            splashImages.forEach((image) => {
                const UrlIndx = newUrls.findIndex((currUrl) => currUrl === image.urls);
                if (UrlIndx >= 0) {
                    newUrls.splice(UrlIndx, 1);
                } else {
                    newUrls.push(image.urls);
                }
            });
            setSplashImagesUrls(newUrls);
        } catch (err) {
            // Handle error as needed
        }
    };

    const setBoardBackground = (imageUrl) => {
        if (setImageUrl) {
            setImageUrl(imageUrl)
            return;
        }

        const newBoard = { ...board };
        newBoard.boardBgImage = imageUrl.full;
        newBoard.boardBgThumbnail = imageUrl.small;
        const msg = `${user} changed background image`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType);
    };

    const stopPropagation = (ev) => {
        ev.stopPropagation();
    };

    return (
        <div className="splash-menu flex column align-center translateLeft" onClick={(ev) => stopPropagation(ev)}>
            <div className="flex column fill-width filter-container">
                <div className="splash-menu-search-bar fill-width flex justify-center">
                    <input type="text" placeholder="Search by name..." onChange={inputChange} />
                    <button className="splash-menu-search-bar-save-btn flex center" onClick={onSave}>
                        <SearchIcon />
                    </button>
                </div>
            </div>
            <div className="splash-images-container-wrapper">
                <div className="splash-images-container flex wrap fill-width">
                    {splashImagesUrls.slice(0, perpage).map((imageUrl) => (
                        <div key={imageUrl.small} className="splash-images-container-item flex wrap" >
                            <img src={imageUrl.small} alt="oops.. didn't find it" onClick={() => setBoardBackground(imageUrl)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SplashMenu;
