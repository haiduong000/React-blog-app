import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const followStatus = createSlice({
  name: "follow",
  initialState: {
    follow: false,
  },
  reducers: {
    setFollowStatus: (state, action) => {
      state.follow = action.payload;
    },
  },
});

const followWorld = createSlice({
  name: "name",
  initialState: {
    name: "Duong Doan",
  },
  reducers: {
    setFollowWorld: (state, action) => {
      state.name = action.payload;
    },
  },
});

const followNameNumber = createSlice({
  name: "update",
  initialState: {
    update: false,
  },
  reducers: {
    setFollowNameNumber: (state, action) => {
      state.update = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { setFollowStatus } = followStatus.actions;
export const { setFollowWorld } = followWorld.actions;
export const { setFollowNameNumber } = followNameNumber.actions;

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    follow: followStatus.reducer,
    name: followWorld.reducer,
    update: followNameNumber.reducer,
  }),
});
