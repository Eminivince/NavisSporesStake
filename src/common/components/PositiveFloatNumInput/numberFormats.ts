export const numToGrouped = (num: string) => {
  return num
    .split(".")
    .map((v, index) => {
      if (index > 0) return v;
      else {
        return v
          .split("")
          .map((l, index2) => {
            const revertIndex = v.length - index2;
            if ((revertIndex - 1) % 3 === 0 && revertIndex !== 1) {
              return `${l},`;
            } else {
              return l;
            }
          })
          .join("");
      }
    })
    .join(".");
};

// Cut decimals to its max allowed count
export const cutDecimals = (v: string, maxDecimals: number | undefined) => {
  const decimalsLength = v.split(".")[1]?.length || 0;
  if (typeof maxDecimals === "number" && decimalsLength > maxDecimals) {
    v = v
      .split(".")
      .map((vs, index) => {
        if (index > 0) {
          return vs.slice(0, maxDecimals);
        }
        return vs;
      })
      .join(".");
    if (/^[\d]+\.$/.test(v)) v = v.replace(".", "");
  }
  return v;
};
