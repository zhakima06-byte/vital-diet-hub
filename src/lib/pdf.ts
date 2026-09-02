/** Export d'un élément DOM en PDF A4 (multi-pages), côté navigateur uniquement. */
export async function exportElementToPdf(element: HTMLElement, fileName: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;

  // Hauteur (en px canvas) correspondant à une page utile
  const pxPerMm = canvas.width / usableWidth;
  const pageHeightPx = Math.floor(usableHeight * pxPerMm);

  let offset = 0;
  let first = true;

  while (offset < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - offset);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = sliceHeight;
    const ctx = slice.getContext("2d");
    if (!ctx) break;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(canvas, 0, offset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    if (!first) pdf.addPage();
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.92),
      "JPEG",
      margin,
      margin,
      usableWidth,
      sliceHeight / pxPerMm,
    );
    first = false;
    offset += sliceHeight;
  }

  pdf.save(fileName);
}
