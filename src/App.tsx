import React from 'react';
import Router from './Router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {store} from './store';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}} edges={['bottom']}>
              <Router />
            </SafeAreaView>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
