import GroupMemberStreak from './GroupMemberStreak';

interface PopulatedMember {
    _id: string;
    username: string;
    groupMemberStreak: GroupMemberStreak;
}

export default PopulatedMember;
