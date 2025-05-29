// This is the old supabase client, it cannot be used for now. 
// AS there is a third party library that is not compatible with the new supabase client.
//Waiting for the library to be updated.

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createClient } from "@supabase/supabase-js";
// import { AppState, AppStateStatus } from "react-native";
// import "react-native-url-polyfill/auto";

// // Initialize Supabase client
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
// const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

// // Handle auth session refresh
// const handleAppStateChange = (state: AppStateStatus) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// };

// // Setup auth refresh listener
// let appStateSubscription: any = null;

// export const setupAuthRefresh = () => {
//   if (!appStateSubscription) {
//     appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
//   }
// };

// export const cleanupAuthRefresh = () => {
//   if (appStateSubscription) {
//     appStateSubscription.remove();
//     appStateSubscription = null;
//   }
// };