import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

   Reactotron
     .setAsyncStorageHandler(AsyncStorage)
     .configure({
       name: 'GoLeaf',
     })
     .useReactNative({
       asyncStorage: false,
       networking: {
         ignoreUrls: /symbolicate/,
       },
       editor: false,
       errors: { veto: (stackFrame) => false },
       overlay: false,
     })
     .connect();

   export default Reactotron;