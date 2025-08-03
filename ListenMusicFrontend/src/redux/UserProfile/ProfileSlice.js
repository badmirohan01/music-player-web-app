import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User Identity & Profile Data
  id: null,
  email: "",
  name: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  emailVerified: false,
  adFreeTime: false,

  // Authentication State
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
  lastLoginTime: null,
  timeDifferenceMs: null,

  // Token Management
  accessToken: null,
  tokenExpiresAt: null,

  // User Preferences & Settings
  theme: "light",
  language: "en",
  timezone: null,
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },

  // Account Status
  accountStatus: "active",
  roles: [],

  // Metadata
  createdAt: null,
  updatedAt: null,
  loginCount: 0,
  lastActivity: null,

  // Optional Extended Data
  phoneNumber: "",
  onboardingCompleted: false,
  preferences: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Authentication Actions
    loginStart: (state) => {
      state.isLoading = true;
      state.loginError = null;
    },

    loginSuccess: (state, action) => {
      const {
        id,
        email,
        name,
        given_name,
        family_name,
        picture,
        email_verified,
        accessToken,
        expiresAt,
      } = action.payload;

      state.isAuthenticated = true;
      state.isLoading = false;
      state.loginError = null;

      // Update user data
      state.id = id;
      state.email = email;
      state.name = name;
      state.firstName = given_name || "";
      state.lastName = family_name || "";
      state.profilePicture = picture || "";
      state.emailVerified = email_verified || false;

      // Update tokens
      state.accessToken = accessToken;
      state.tokenExpiresAt = expiresAt;

      // Update metadata
      state.lastLoginTime = new Date().toISOString();
      state.loginCount += 1;
      state.lastActivity = new Date().toISOString();

      // Set creation time if first login
      if (!state.createdAt) {
        state.createdAt = new Date().toISOString();
      }
      state.updatedAt = new Date().toISOString();
    },

    loginFailure: (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
      state.isAuthenticated = false;
    },

    logout: (state) => {
      // Reset to initial state but keep some preferences
      const { theme, language, preferences } = state;

      Object.assign(state, {
        ...initialState,
        theme,
        language,
        preferences,
      });
    },

    // Profile Update Actions
    updateProfile: (state, action) => {
      const updates = action.payload;
      Object.keys(updates).forEach((key) => {
        if (key in state) {
          state[key] = updates[key];
        }
      });
      state.updatedAt = new Date().toISOString();
      state.lastActivity = new Date().toISOString();
    },

    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
      state.updatedAt = new Date().toISOString();
    },

    updateNotificationSettings: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
      state.updatedAt = new Date().toISOString();
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // Token Management
    updateToken: (state, action) => {
      const { accessToken, expiresAt } = action.payload;
      state.accessToken = accessToken;
      state.tokenExpiresAt = expiresAt;
      state.lastActivity = new Date().toISOString();
    },

    clearToken: (state) => {
      state.accessToken = null;
      state.tokenExpiresAt = null;
    },

    // Onboarding
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
      state.updatedAt = new Date().toISOString();
    },

    // Activity Tracking
    updateLastActivity: (state) => {
      state.lastActivity = new Date().toISOString();
    },

    // Clear Errors
    clearLoginError: (state) => {
      state.loginError = null;
    },

    updateTimeDifferenceMs: (state, action) => {
      state.timeDifferenceMs = action.payload;
    },

    updateAdFreeTime: (state, action) => {
      state.adFreeTime = action.payload;
    },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  updatePreferences,
  updateNotificationSettings,
  setTheme,
  setLanguage,
  updateToken,
  clearToken,
  completeOnboarding,
  updateLastActivity,
  clearLoginError,
  updateTimeDifferenceMs,
  updateAdFreeTime,
} = profileSlice.actions;

// Selectors
export const selectProfile = (state) => state.profile;
export const selectIsAuthenticated = (state) => state.profile.isAuthenticated;
export const selectIsLoading = (state) => state.profile.isLoading;
export const selectLoginError = (state) => state.profile.loginError;
export const selectUserData = (state) => ({
  id: state.profile.id,
  email: state.profile.email,
  name: state.profile.name,
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
  profilePicture: state.profile.profilePicture,
});
export const selectUserPreferences = (state) => ({
  theme: state.profile.theme,
  language: state.profile.language,
  notifications: state.profile.notifications,
  preferences: state.profile.preferences,
});
export const selectIsTokenValid = (state) => {
  const { accessToken, tokenExpiresAt } = state.profile;
  if (!accessToken || !tokenExpiresAt) return false;
  return new Date().getTime() < new Date(tokenExpiresAt).getTime();
};

export default profileSlice.reducer;
