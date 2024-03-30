import create from 'zustand';
import { ISurvey } from '../interfaces/SuerveyInterface';

interface SurveyState {
  SurveyInfo: ISurvey;
  setSurveyState: (newSurveyInfo: ISurvey) => void;
}

const initialSurveyState: SurveyState = {
  SurveyInfo: {
    memberPersonality: {
      daytime: 0,
      nighttime: 0,
      fast: 0,
      late: 0,
      dinner: 0,
      smoke: 0,
      drink: 0,
      outside: 0,
      inside: 0,
      quiet: 0,
      liveLong: 0,
      liveShort: 0,
      pet: 0,
      cold: 0,
      hot: 0,
      hostHousePrefer: 0,
    },
    member: {
      college: '',
      gender: '',
      sleepAt: '',
      wakeAt: '',
      returnAt: '',
    },
  },
  setSurveyState: (newSurvey: ISurvey) => {},
};

export const useSurveyStore = create<SurveyState>((set) => ({
  ...initialSurveyState,
  setSurveyState: (newSurvey: ISurvey) => set((state) => ({ ...state, SurveyInfo: newSurvey })),
}));
