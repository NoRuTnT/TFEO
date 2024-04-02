import React from 'react';
import { IMember } from '../interfaces/MemberInterface';
import { useHomeStore } from '../store/HomeStore';
import { useMemberStore } from '../store/MemberStore';
export function MemberInfoUtils(member: IMember) {
  const { setMemberState, setMemberPersonality } = useMemberStore();
  setMemberState(member);
  setMemberPersonality(member.memberPersonality);
}
