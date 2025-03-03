export type TProfile = {
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  links: TLink[];
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
