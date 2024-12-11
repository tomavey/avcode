export const useGotRights = () => {
  const { profile } = useProfiles()
  //requiredRights can me a single word string, a comma delimited list as a string or an array
  const gotRights = (requiredRights) => {
    try {
      // Use authorized_to directly as it's already an array
      const userRights = profile.value.authorized_to;

      // Normalize required rights to an array
      const requiredRightsArray = Array.isArray(requiredRights)
        ? requiredRights
        : requiredRights.includes(",")
          ? requiredRights.split(",").map((right) => right.trim())
          : [requiredRights.trim()];

      // Check if any of the required rights are included in the user's rights
      return requiredRightsArray.some((right) => userRights.includes(right));
    } catch (error) {
      // If there's an error, return false
      return false;
    }
  };

  return { gotRights }
}
