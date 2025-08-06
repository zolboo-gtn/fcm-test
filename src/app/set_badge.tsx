export const setBadge = (count: number) => {
  const favicon: HTMLLinkElement | null = document.querySelector(
    "link[rel~='icon']"
  );

  if (!favicon) return;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return;
  const img = document.createElement("img");

  img.src = "/favicon.ico";
  const faviconSize = 32;
  const badgeSize = faviconSize * 0.5;

  // NOTE: Leaving this commented out for now, as a reference for circle badge
  // const badgeShape: "circle" | "square" = "square";
  img.addEventListener("load", () => {
    canvas.width = faviconSize;
    canvas.height = faviconSize;
    context.drawImage(img, 0, 0, faviconSize, faviconSize);

    if (count > 0) {
      context.fillStyle = "#F76B67";
      // if (badgeShape === "circle") {
      //   context.arc(
      //     faviconSize - badgeSize / 2,
      //     faviconSize - badgeSize / 2,
      //     badgeSize / 2,
      //     0,
      //     2 * Math.PI,
      //   );
      //   context.fill();
      // } else if (badgeShape === "square") {
      context.fillRect(
        faviconSize - badgeSize,
        faviconSize - badgeSize,
        badgeSize,
        badgeSize
      );
      // }
      context.fillStyle = "#FFFFFF";
      context.font = `${badgeSize}px 'helvetica', Assistant`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        count.toString(),
        faviconSize - badgeSize / 2,
        faviconSize - badgeSize / 2
      );
    }

    favicon.href = canvas.toDataURL("image/x-icon");
  });
};
