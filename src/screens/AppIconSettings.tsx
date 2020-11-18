import { observer } from "mobx-react";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { changeIcon } from "react-native-change-icon";

import ActionMenu from "../common/ActionMenu";
import AppState from "../stores/AppState";
import { Themes } from "../types";

const AppIconSettings = observer(() => {
  const appStateStore = useContext(AppState);

  const switchIcon = (newIconRef: string, newIconName: string) => {
    changeIcon(newIconRef).then((success) => {
      if (success) {
        appStateStore.setAppIcon(newIconName);
      }
    });
  };

  const items = [
    [
      {
        title: "Default",
        icon: appStateStore.appIcon === "Default" ? "CheckCircle" : "Circle",
        thumbImage: require('../../assets/Images/app-icon.png'),
        action: () => switchIcon("logo_white", "Default"),
      },
      {
        title: "Deep Space",
        icon: appStateStore.appIcon === "Deep Space" ? "CheckCircle" : "Circle",
        thumbImage: require('../../assets/Images/app-icon-dark.png'),
        action: () => switchIcon("logo_black", "Deep Space"),
      },
      {
        title: "Supernova",
        icon: appStateStore.appIcon === "Supernova" ? "CheckCircle" : "Circle",
        thumbImage: require('../../assets/Images/app-icon-darkblue.png'),
        action: () => switchIcon("logo_darkblue", "Supernova"),
      },
      {
        title: "Oxygen",
        icon: appStateStore.appIcon === "Oxygen" ? "CheckCircle" : "Circle",
        thumbImage: require('../../assets/Images/app-icon-lightblue.png'),
        action: () => switchIcon("logo_lightblue", "Oxygen"),
      },
    ],
  ];

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  );
});

export default AppIconSettings;
