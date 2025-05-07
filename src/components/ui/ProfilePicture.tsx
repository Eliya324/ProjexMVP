import { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";

type ProfilePictureProps = {
  profilePicture: string | null;
  onUpdate?: (formData: FormData) => void;
  isEditable: boolean;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePicture,
  onUpdate,
  isEditable,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when profilePicture prop changes (e.g. when loading from server)
  useEffect(() => {
    setPreview(profilePicture);
  }, [profilePicture]);

  const handleClick = () => {
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result); // Set preview for immediate visual feedback
      }
    };
    reader.readAsDataURL(file);

    if (onUpdate) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      onUpdate(formData);
    }
  };

  return (
    <div
      className={`w-32 h-32 rounded-full overflow-hidden bg-gray-300 ${isEditable ? "cursor-pointer hover:opacity-80 transition" : ""}`}
      onClick={handleClick}
    >
      <Image
        src={preview || "/default-profile.png"}
        alt="Profile"
        width={128}
        height={128}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;
