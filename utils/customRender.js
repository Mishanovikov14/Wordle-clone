import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { render } from "@testing-library/react-native";
import { tokenCache } from "@/utils/cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useColorScheme } from "react-native";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const publishableKey = "pk_test_Y3J1Y2lhbC1tYW4tNDMuY2xlcmsuYWNjb3VudHMuZGV2JA";

const ProviderWrapper = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
