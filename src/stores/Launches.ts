import AsyncStorage from "@react-native-community/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { decorate, observable, action } from "mobx";
import { createContext } from "react";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

import { STATES, API_URL, NOTIFICATIONS_MESSAGES } from "../constants";

class Launches {
  state = STATES.IDLE;
  launches = [];
  notifications = {
    enabled: false,
    delay: 10,
  };

  initApp = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:notifications");
      if (value !== null) {
        this.notifications = JSON.parse(value);
      }
    } catch (error) { }
  };

  loadNextLaunches = (numberOfLaunches = 10) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launch/upcoming?limit=${numberOfLaunches}&mode=detailed`)
      .then((data) => data.json())
      .then((data) => {
        if (data.results) {
          this.launches = data.results;
          this.state = STATES.SUCCESS;
        } else {
          this.state = STATES.ERROR;
        }
      })
      .catch((err) => {
        this.state = STATES.ERROR;
      });
  };

  loadMoreLaunches = (numberOfLaunches) => {
    this.state = STATES.LOADING;
    fetch(
      `${API_URL}launch/upcoming?limit=${numberOfLaunches}&offset=${this.launches.length}&mode=detailed`
    )
      .then((data) => data.json())
      .then((data) => {
        this.launches = this.launches.concat(data.results);
        this.state = STATES.SUCCESS;
      })
      .catch((err) => {
        this.state = STATES.ERROR;
      });
  };

  storeNotificationSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:notifications",
        JSON.stringify(this.notifications)
      );
    } catch (error) { }
  };

  toggleNotifications = Platform.select({
    ios: async () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
      if (this.notifications.enabled) {
        PushNotificationIOS.requestPermissions();
      } else {
        PushNotificationIOS.cancelAllLocalNotifications();
        PushNotificationIOS.removeAllDeliveredNotifications();
      }
    },
    android: () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
    },
  });

  changeNotificationDelay = (time: number) => {
    if (this.notifications.delay + time >= 0) {
      this.notifications.delay += time;
      this.storeNotificationSettings();
    }
  };

  scheduleNotification = Platform.select({
    ios: (data) => {
      if (this.notifications.enabled) {
        PushNotificationIOS.getScheduledLocalNotifications(
          (plannedNotifications) => {
            if (plannedNotifications.length > 0) {
              PushNotificationIOS.cancelAllLocalNotifications();
            }
            if (data.net) {
              const launchTime = new Date(data.net);
              const launchTimestamp = Date.parse(`${launchTime}`);

              const notificationTimestamp =
                launchTimestamp - this.notifications.delay * 60 * 1000;

              // Check if the launch already happened
              // or if the notification has already been sent
              if (
                launchTimestamp <= Date.parse(`${new Date()}`) ||
                notificationTimestamp <= Date.parse(`${new Date()}`)
              ) {
                return;
              }

              const fireDate = new Date(notificationTimestamp);

              const message = NOTIFICATIONS_MESSAGES[
                Math.floor(Math.random() * 4)
              ]
                .replace("$TIME$", `${this.notifications.delay}`)
                .replace("$NAME$", data.name);

              PushNotificationIOS.scheduleLocalNotification({
                fireDate: fireDate.toISOString(),
                alertBody: message,
              });
            }
          }
        );
      }
    },
    android: (data) => {
      if (this.notifications.enabled) {
        PushNotification.cancelAllLocalNotifications();
        PushNotification.localNotificationSchedule({
          date: new Date(data.net).toISOString(),
          message: `🚀 ${data.name} will launch in ${this.notifications.delay} minutes!`,
        });
      }
    },
  });
}

decorate(Launches, {
  state: observable,
  launches: observable,
  notifications: observable,
  toggleNotifications: action,
  changeNotificationDelay: action,
  scheduleNotification: action,
  initApp: action,
});

export default createContext(new Launches());
