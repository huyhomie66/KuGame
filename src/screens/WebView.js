import { WebView } from 'react-native-webview';
import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, BackHandler } from 'react-native';

export default ({ route, navigation }) => {
    const { url } = route.params;

    const [canGoBack, setCanGoBack] = useState();
    const webviewRef = useRef();

    const handleBackButton = () => {
        if (canGoBack) {
            webviewRef.current.goBack();
        }
    };

    const onNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }, []);

    return (
        <WebView
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator
                size="large"
                color="white"
                style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
            />}
            style={{ backgroundColor: 'black' }}
            allowUniversalAccessFromFileURLs
            mixedContentMode="always"
            originWhitelist={['*']}
            cacheEnabled={true}
            source={{ uri: url }}
            onNavigationStateChange={onNavigationStateChange}
        />
    );
};
