import { ProfilePropTypes } from '../context/AppContext';

export const validateProfile = (profile: any): profile is ProfilePropTypes => {
  if (
    typeof profile.firstName == 'string' &&
    typeof profile.lastName == 'string' &&
    typeof profile.address == 'string' &&
    profile.firstName &&
    profile.lastName &&
    profile.address &&
    profile.firstName.length < 59 &&
    profile.lastName.length < 59 &&
    profile.address.length < 59
  ) {
    return true;
  }

  return false;
};
