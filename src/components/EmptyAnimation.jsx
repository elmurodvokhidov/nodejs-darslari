import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../public/assets/Animation - 1721554797520.json'

const EmptyAnimation = () => {
    return (
        <div>
            <Player
                autoplay
                loop
                src={animationData}
                style={{ height: '300px', width: '300px' }}
            />
        </div>
    );
};

export default EmptyAnimation;