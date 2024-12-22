import _ from "lodash";

export const truncateText = (text) => {
  return _.truncate(text, {
    length: 19,
    omission: "...",
  });
};
