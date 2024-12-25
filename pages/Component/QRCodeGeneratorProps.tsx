import QRCode from "qrcode";

// Function to generate QR Code from data
export const generateQrCodeData = async (
  data: object
): Promise<string | null> => {
  try {
    const serializedData = JSON.stringify(data);
    const qrCode = await QRCode.toDataURL(serializedData, {
      width: 128,
    });
    return qrCode;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};
