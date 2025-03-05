"use client";

import Image from "next/image";
import { useRef } from "react";

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
    <div>
      <input
        className="hidden"
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      <button
        className="relative size-48 cursor-pointer rounded-lg bg-purple-400"
        type="button"
        onClick={() => uploadInputRef?.current?.click()}
      >
        {!!image && (
          <Image src={image.url} alt="" fill className="object-cover" />
        )}
        {!image && <span>Upload image</span>}
      </button>
    </div>
  );
}
