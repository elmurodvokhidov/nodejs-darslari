import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../public/assets/Animation - 1721553738302.json'

const MainLoader = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <Player
                autoplay
                loop
                src={animationData}
                style={{ height: '300px', width: '300px' }}
            />
        </div>
    );
};

export default MainLoader;
