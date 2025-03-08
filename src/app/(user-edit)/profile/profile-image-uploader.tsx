"use client";

import Image from "next/image";
import { useRef } from "react";

import UploadImageIcon from "@/components/ui/upload-image-icon";

export type TImageUpload = {
  id: string;
  url: string;
  file?: File;
};

type TProps = {
  image: TImageUpload | undefined;
  onImageChange: (image: TImageUpload) => void;
};

export default function ProfileImageUploader({
  image = undefined,
  onImageChange,
}: TProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [file] = e.target.files || [];
    const newImage = {
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      file,
    };
    onImageChange(newImage);
  }

  return (
    <div className="text-primary font-semibold">
      <input
        className="hidden"
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      <button
        className="bg-muted relative size-48 cursor-pointer overflow-hidden rounded-lg"
        type="button"
        onClick={() => uploadInputRef?.current?.click()}
      >
        {!!image && (
          <>
            <Image src={image.url} alt="" fill className="object-cover" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              <UploadImageIcon />
              <span>Change Image</span>
            </span>
          </>
        )}
        {!image && (
          <span className="flex flex-col items-center justify-center gap-2">
            <UploadImageIcon />
            <span>+ Upload Image</span>
          </span>
        )}
      </button>
    </div>
  );
}
