/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    Docs: {
                        screens: {
                            Docs: "docs",
                        },
                    },
                    Account: {
                        screens: {
                            Account: "account",
                        },
                    },
                },
            },
            Modal: "modal",
            NotFound: "*",
        },
    },
};

export default linking;
