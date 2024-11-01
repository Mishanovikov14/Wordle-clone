import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_900Black,
} from "@expo-google-fonts/frank-ruhl-libre";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Platform, Pressable, useColorScheme, Appearance } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { tokenCache } from "@/utils/cache";

import Logo from "@/assets/images/nyt-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/utils/storage";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [dark] = useMMKVBoolean("dark-mode", storage);

  useEffect(() => {
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(dark ? "dark" : "light");
    }
  }, [dark]);

  const [fontsLoaded] = useFonts({
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen
                  name="login"
                  options={{
                    presentation: "modal",
                    headerShadowVisible: false,
                    headerTintColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                    headerTitle: () => <Logo width={150} height={40} />,
                    headerLeft: () => {
                      return (
                        Platform.OS === "ios" && (
                          <Pressable onPress={() => router.back()}>
                            <Ionicons
                              name="close"
                              size={26}
                              color={Colors.light.gray}
                            />
                          </Pressable>
                        )
                      );
                    },
                  }}
                />

                <Stack.Screen
                  name="game"
                  options={{
                    headerBackTitle: "Wprdle",
                    headerTintColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                    title: ""
                  }}
                />

                <Stack.Screen
                  name="end"
                  options={{
                    title: "",
                    headerShown: false
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
