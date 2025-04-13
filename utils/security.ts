import { authRoutes } from "@/assets/api";
import { BASE_URL } from "./service";

export const generateStrongPassword = () => {
  const length = 12;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password =
    lowercase.charAt(Math.floor(Math.random() * lowercase.length)) +
    uppercase.charAt(Math.floor(Math.random() * uppercase.length)) +
    numbers.charAt(Math.floor(Math.random() * numbers.length)) +
    specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  const allChars = lowercase + uppercase + numbers + specialChars;

  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

export const generateApplePassUrl = (_id: string) => {
  return `http://192.168.2.190:3000/download/${_id}.pkpass`;
};

export const invertHexColor = (hex: string) => {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128 ? "#FFFFFF" : "#000000";
};

interface applePass {
  accessToken: string;
  onChanged: (value: boolean) => void;
  onSuccess: (file: any) => void;
}

export const createApplePass = async ({
  accessToken,
  onChanged,
  onSuccess,
}: applePass) => {
  try {
    onChanged(true);

    const url = BASE_URL + authRoutes.appleWalletPass;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/vnd.apple.pkpass",
        "Content-Type": "application/vnd.apple.pkpass",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    onChanged(false);

    if (response) {
      const buffer = await response.arrayBuffer();

      const file = createFileLink({
        fileBuffer: buffer || new ArrayBuffer(0),
      });

      onSuccess(file);
    }
  } catch (error) {
    onChanged(false);
  }
};

interface pkPassFile {
  fileBuffer: ArrayBuffer;
}

export const createFileLink = ({ fileBuffer }: pkPassFile) => {
  try {
    if (!fileBuffer) {
      console.error("No pass buffer found.");
      return;
    }

    const blob = new Blob([fileBuffer], {
      type: "application/vnd.apple.pkpass",
    });

    const fileName = `${Date.now()}.pkpass`;
    const file = new File([blob], fileName, {
      type: "application/vnd.apple.pkpass",
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return file;
  } catch (error) {
    return;
  }
};

export const base64ToBlob = (base64Data: string, contentType: string): Blob => {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
