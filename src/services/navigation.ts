import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

let pendingNavigation: (() => void) | null = null;

export const navigationRef = createNavigationContainerRef();

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params || {});
//   }
// }

export function replace({
  screen,
  params,
}: {
  screen: string;
  params?: any;
  // params?: {screen: string; params?: any};
}) {
  console.log('navigationRef.isReady()', navigationRef.isReady());
  const action = () => {
    if (params) {
      navigationRef.dispatch(StackActions.replace(screen, params));
    } else {
      navigationRef.dispatch(StackActions.replace(screen));
    }
  };

  if (navigationRef.isReady()) {
    action();
  } else {
    console.log('Navigation not ready. Saving pending navigation...');
    pendingNavigation = action;
  }
}

export function tryFlushPendingNavigation() {
  if (navigationRef.isReady() && pendingNavigation) {
    console.log('Flushing pending navigation...');
    pendingNavigation();
    pendingNavigation = null;
  }
}

// export function currentRoute() {
//   return navigationRef.getCurrentRoute();
// }

// export function back() {
//   if (navigationRef.isReady()) {
//     navigationRef.goBack();
//   }
// }
