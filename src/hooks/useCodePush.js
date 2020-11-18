import { useEffect, useState } from 'react';
import codePush from 'react-native-code-push';
import { getItem, setItem } from '../helpers/asyncStorage';

export default () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let lastUpdate = (await getItem('lastUpdate')) || 0;
        lastUpdate = Number(lastUpdate);

        if (Date.now() - lastUpdate <= 1000 * 60) {
          setSynced(true);
          return;
        }

        const syncStatus = await codePush.checkForUpdate();

        if (syncStatus) {
          if (syncStatus.failedInstall) {
            setSynced(true);
            return;
          }

          setHasUpdate(true);
          codePush.sync(
            { installMode: codePush.InstallMode.IMMEDIATE },
            async (status) => {
              if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
                await setItem('lastUpdate', `${Date.now()}`);
                setSynced(true);
              }
            },
            (updateProgress) => {
              const { receivedBytes, totalBytes } = updateProgress;
              setProgress(receivedBytes / totalBytes);
            },
          );
        } else {
          setSynced(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return {
    hasUpdate,
    progress,
    synced,
  };
};
