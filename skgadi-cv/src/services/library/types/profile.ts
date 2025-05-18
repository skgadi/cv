export interface GSK_PROFILE_METADATA {
  id: string;
  uid: string;
  name: string;
}
export interface GSK_PROFILE {
  id: string;
  uid: string;
  name: string;
  emails: string[];
  phones: string[];
  addresses: string[];
  nationalities: string[];
  date_of_birth: string;
  affiliations: string[];
  categories?: GSK_CATEGORY[];
}

export interface GSK_CATEGORY {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  fgColor: string;
  desc: string;
}

export interface GSK_PROFILE_EMAIL {
  email: string;
  email_type: string;
  email_description: string;
}

export interface GSK_PROFILE_PHONE {
  phone: string;
  phone_type: string;
  phone_description: string;
}

export interface GSK_PROFILE_ADDRESS {
  address: string;
  address_type: string;
  address_description: string;
}

export interface GSK_PROFILE_AFFILIATION {
  institution: string;
  department: string;
  position: string;
}
