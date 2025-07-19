"use client";

import { XIcon } from "lucide-react";
import { CldImage, CldUploadButton } from "next-cloudinary";

interface UploadResult {
  info?: {
    secure_url: string;
  };
  event: "success";
}

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
}

function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = (result: UploadResult) => {
    if (result.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  // If a value (URL) exists, display the image and a remove button
  if (value) {
    return (
      <div className="relative size-40">
        <CldImage
          src={value}
          alt="Upload"
          width={160}
          height={160}
          crop="fill"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
          aria-label="Remove image"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  // If no value, display the upload button
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint="/api/signImage"
      onSuccess={(result) => {
        handleUpload(result as UploadResult);
      }}
      // 3. Optional: Configure upload options
      options={{
        multiple: false,
        resourceType: "image",
        autoMinimize: true,
      }}
    >
      <div className="w-40 h-40 border-2 border-dashed rounded-md flex items-center justify-center">
        <p>Upload Image</p>
      </div>
    </CldUploadButton>
  );
}

export default ImageUpload;
