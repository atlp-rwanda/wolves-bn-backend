import Notifications from '../../services/trip.notification';

const NotificationListener = () => {
  Notifications.sendTripNotification();
};

export default NotificationListener;