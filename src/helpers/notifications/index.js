import Notifications from '../../services/notification';

const NotificationListener = () => {
  Notifications.sendNotifications();
};

export default NotificationListener;