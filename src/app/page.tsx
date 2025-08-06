import { FCM } from "./fcm";
import { FCMToken } from "./fcm_token";
import { NotificationPermission } from "./notification_permission";

const HomePage = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <FCM />
      <NotificationPermission />
      <FCMToken />
    </div>
  );
};

export default HomePage;
