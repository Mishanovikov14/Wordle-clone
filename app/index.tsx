import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SubscribeModal from "@/components/SubscribeModal";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Index() {
  const colorScheme = useColorScheme();
  const subscribeModalRef = useRef<BottomSheetModal>(null);

  const { signOut } = useAuth();

  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const TextColor = Colors[colorScheme ?? "light"].text;

  const handlePresentSubscribeModal = () =>
    subscribeModalRef.current?.present();

  return (
    <View style={[styles.container, { backgroundColor }]} testID="test">
      <SubscribeModal ref={subscribeModalRef} />

      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>
          Get 6 chance to guess a 5 -letter word.
        </ThemedText>
      </Animated.View>

      <View style={styles.menu}>
        <Link
          href={"/game"}
          style={[
            styles.button,
            {
              backgroundColor: colorScheme === "light" ? "#000000" : "#4a4a4a",
            },
          ]}
          asChild
        >
          <AnimatedPressable entering={FadeInLeft}>
            <Text style={[styles.buttonText, styles.primaryText]}>Play</Text>
          </AnimatedPressable>
        </Link>

        <SignedOut>
          <Link
            href="/login"
            style={[styles.button, { borderColor: TextColor }]}
            asChild
          >
            <AnimatedPressable entering={FadeInLeft.delay(100)}>
              <ThemedText style={styles.buttonText}>Log in</ThemedText>
            </AnimatedPressable>
          </Link>
        </SignedOut>

        <SignedIn>
          <AnimatedPressable
            onPress={() => signOut()}
            style={[styles.button, { borderColor: TextColor }]}
            entering={FadeInLeft.delay(100)}
          >
            <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
          </AnimatedPressable>
        </SignedIn>

        <AnimatedPressable
          onPress={handlePresentSubscribeModal}
          style={[styles.button, { borderColor: TextColor }]}
          entering={FadeInLeft.delay(200)}
        >
          <ThemedText style={styles.buttonText}>Subscribe</ThemedText>
        </AnimatedPressable>
      </View>

      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerDate}>
          {format(new Date(), "MMMM d, yyyy")}
        </ThemedText>
        <ThemedText style={styles.footerText}>No. 1215</ThemedText>
        <ThemedText style={styles.footerText}>Editing by Mike</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 40,
  },

  header: {
    alignItems: "center",
    gap: 10,
  },

  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },

  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },

  button: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },

  buttonText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
  },

  primaryText: {
    color: "#fff",
  },

  footer: {
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 14,
  },

  footerDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
