export interface CreateMemberDTO {
  name: string;
  email: string;
  membership_type: string;
}

export interface UpdateMemberDTO {
  name?: string;
  email?: string;
  membership_type?: string;
}

export interface MemberResponseDTO {
  id: number;
  name: string;
  email: string;
  membership_type: string;
  join_date: Date;
}