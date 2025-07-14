import { HeartIcon, BellIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BellIcon as BellIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import FlipCard from './interactions/FlipCard';
import MicroInteraction from './interactions/MicroInteraction';
import BicycleLoader from './interactions/BicycleLoader';
import RippleButton from './interactions/RippleButton';
import ProgressBar from './interactions/ProgressBar';
import LoadingDots from './interactions/LoadingDots';
import FloatingButton from './interactions/FloatingButton';
import HoverCard from './interactions/HoverCard';

const InteractionsShowcase = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Micro-interactions</h3>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
          <div className="flex flex-wrap gap-4">
            <MicroInteraction
              icon={HeartIcon}
              iconSolid={HeartIconSolid}
              label="Like"
              variant="like"
            />
            <MicroInteraction
              icon={StarIcon}
              iconSolid={StarIconSolid}
              label="Favorite"
              variant="favorite"
            />
            <MicroInteraction
              icon={BellIcon}
              iconSolid={BellIconSolid}
              label="Notify"
              variant="primary"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
            Hover and click to see the interactions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Card Flip</h3>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
          <FlipCard />
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
            Click the card to flip it
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Loading States</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <BicycleLoader />
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Dynamic speed variations with particle trails
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
            <ProgressBar />
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Smooth progress animation
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <LoadingDots />
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Stagering dots animation
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Ripple Buttons</h3>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
          <RippleButton className="bg-primary text-white w-full">
            Primary Button
          </RippleButton>
          <RippleButton className="bg-purple-500 text-white w-full" variant="secondary">
            Secondary Button
          </RippleButton>
          <RippleButton className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-full" variant="neutral">
            Neutral Button
          </RippleButton>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
            Click the buttons to see ripple effects
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Floating Elements <span className="text-sm text-gray-600 dark:text-gray-300">(Hover me)</span></h3>
        <div className="flex justify-center">
          <FloatingButton />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Hover Cards</h3>
        <HoverCard>
          <h4 className="text-lg font-medium mb-2">Interactive Card</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Hover over me to see a smooth tilt effect
          </p>
        </HoverCard>
      </div>



    </div>
  );
};

export default InteractionsShowcase;
