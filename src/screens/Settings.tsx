import { useNavigation, useTheme } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Linking } from "react-native";
import * as StoreReview from "react-native-store-review";
import styled from "styled-components/native";

import Package from "../../package.json";
import ActionMenu from "../common/ActionMenu";
import SelectionModal from "../common/SelectionModal";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";
import Launches from "../stores/Launches";
import { Themes, Browsers } from "../types";

const BottomText = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.secondaryText};
`;

const Settings = observer(() => {
  useEffect(() => {
  }, []);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const launchesStore = useContext(Launches);
  const appStateStore = useContext(AppState);
  const items = [
    [
      {
        title: "Appearance",
        icon: "ChevronRight",
        preview:
          appStateStore.theme === Themes.automatic
            ? "Automatic"
            : appStateStore.theme === Themes.light
              ? "Light"
              : "Dark",
        action: () => navigation.navigate("Appearance"),
      },
      {
        title: "App Icon",
        icon: "ChevronRight",
        action: () => navigation.navigate("Icon"),
        preview: appStateStore.appIcon,
      },
      {
        title: "Open Links in",
        icon: "ChevronRight",
        action: () => setModalVisible(true),
        preview:
          appStateStore.browser === Browsers.safari
            ? "Safari"
            : "In-App Safari",
      },
    ],
    [
    ],
    [
    ],
  ];

  const modalActions = [
    {
      icon: "Compass",
      title: "In-App Browser",
      action: () => {
        appStateStore.setBrowser(Browsers.inApp);
      },
      id: Browsers.inApp,
    },
    {
      icon: "Compass",
      title: "Safari",
      action: () => {
        appStateStore.setBrowser(Browsers.safari);
      },
      id: Browsers.safari,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {modalVisible && (
        <SelectionModal
          closeModal={() => {
            setModalVisible(false);
          }}
          title="Open Links in..."
          actions={modalActions}
          selected={appStateStore.browser}
        />
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ActionMenu items={items} />
        <BottomText>2020 - HuyHomie</BottomText>
      </ScrollView>
    </View>
  );
});

export default Settings;
