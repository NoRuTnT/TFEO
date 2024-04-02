import create from 'zustand';

interface ActivityState {
  ActivityInfo: {
    memberNo: number;
    memberName: string;
    activityNo: number;
    week: string;
    createdAt: string;
    activityImageUrl: string;
    activityText: string;
    activityApproveType: string;
    contractNo: string;
    si: string;
    sgg: string;
    emd: string;
    ro: string;
    detail: string;
  };
  setActivity: (
    updateFn: (currentActivityInfo: ActivityState['ActivityInfo']) => ActivityState['ActivityInfo'],
  ) => void;
}

const initialActivityState: ActivityState = {
  ActivityInfo: {
    memberNo: 0,
    memberName: '',
    activityNo: 0,
    week: '',
    createdAt: '',
    activityImageUrl: '',
    activityText: '',
    activityApproveType: '',
    contractNo: '',
    si: '',
    sgg: '',
    emd: '',
    ro: '',
    detail: '',
  },
  setActivity: () => {},
};

export const useActivityStore = create<ActivityState>((set) => ({
  ...initialActivityState,
  setActivity: (updateFn) =>
    set((state) => ({
      ...state,
      ActivityInfo: updateFn(state.ActivityInfo),
    })),
}));
