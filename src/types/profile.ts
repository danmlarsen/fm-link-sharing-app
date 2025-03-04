export type TProfile = TProfileDetails & {
  id: string;
  uid: string;
  links: TLink[];
};

export type TProfileDetails = {
  avatar?: string;
  email?: string;
  firstName: string;
  lastName: string;
};

export type TLink = {
  platform: string;
  url: string;
};

export type TPlatform = {
  id: string;
  title: string;
  url: string;
  color: string;
  icon: string;
};
