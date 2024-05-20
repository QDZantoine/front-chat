import { Card } from "flowbite-react";
import '../App.css';

const AppCard = () => {
	return (
    <Card
    className="max-w-sm"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="./public/front-background.png"
  >
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      API-CHAT
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </Card>
  );
}
export default AppCard;