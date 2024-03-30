export interface ISurvey {
  memberPersonality: {
    daytime: number;
    nighttime: number;
    fast: number;
    late: number;
    dinner: number;
    smoke: number;
    drink: number;
    outside: number;
    inside: number;
    quiet: number;
    liveLong: number;
    liveShort: number;
    pet: number;
    cold: number;
    hot: number;
    hostHousePrefer: number;
  };
  member: {
    college: string;
    gender: string;
    sleepAt: string;
    wakeAt: string;
    returnAt: string;
  };
}
