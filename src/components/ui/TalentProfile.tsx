"use client"
import { MapPin } from "lucide-react";
import { useUser } from '@clerk/nextjs'
import StarFull from '../../../public/star-full.svg';
import StarEmpty from '../../../public/star-empty.svg';
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { useTalent } from "@/contexts/TalentContext";
import EditableField from "./EditableField";
import SkillsSection from "./SkillsSection";
import ProfilePicture from "./ProfilePicture";
import EditableArrayField from "./EditableArrayField";
import { getNeonIdFromClerkId } from "@/lib/clerkToNeon";


const fullUserWithRelations = {
  professionalExperiences: true,
  educations: true,
  certifications: true,
  projectRelationships: {
    include: {
      project: true,
    },
  },
  relationshipsSent: true,
  relationshipsReceived: true,
};

type FullUser = Prisma.UserGetPayload<{ include: typeof fullUserWithRelations }>;
type Relationship = FullUser['relationshipsSent'][number];

const languages = ["English", "Spanish", "Hebrew", "French", "German"];

const interests = ["j", "nm", " cd", "hbjn", "jn"];

//Only for checking-Insert the email of the man you want to watch him.
// In the futer this page will get this parameter 
const email = "chayalegut@gmail.com";

export default function TalentProfile() {
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const { setEducation, setExperience } = useTalent();
  const [isEditing, setIsEditing] = useState(false);
  const [friendRelationship, setFriendRelationship] = useState<Relationship | undefined>(undefined);
  const [followerRelationship, setFollowerRelationship] = useState<Relationship | undefined>(undefined);
  const { user } = useUser();




  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/profile?email=${email}`);
      const data = await res.json();
      console.log("data", data);
      setFullUser(data);
      if (data.educations) setEducation(data.educations);
      if (data.professionalExperiences) setExperience(data.professionalExperiences);
    }

    fetchUser();
  }, []);


  useEffect(() => {
    const fetchNeonIdAndCompare = async () => {
      if (!user || !fullUser) return;

      try {
        const res = await fetch('/api/getNeonId');
        const data = await res.json();
        const neonId = data.neonId;

        if (neonId === fullUser.id) {
          setIsEditing(true);
        }

        const friendRel =
          fullUser.relationshipsReceived?.find(
            (rel) => rel.fromUserId === neonId && rel.type === "FRIEND"
          ) ||
          fullUser.relationshipsSent?.find(
            (rel) => rel.toUserId === neonId && rel.type === "FRIEND"
          );

        const followerRel = fullUser.relationshipsReceived?.find(
          (rel) => rel.fromUserId === neonId && rel.type === "FOLLOWER"
        );

        setFriendRelationship(friendRel);
        setFollowerRelationship(followerRel);
      } catch (err) {
        console.error('Error fetching neonId', err);
      }
    };

    fetchNeonIdAndCompare();
  }, [user, fullUser]);



  const handleAddSkill = (newSkill: string) => {
    setFullUser((prevUser) => ({
      ...prevUser!,
      skills: [...(prevUser?.skills || []), newSkill],
    }));
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFullUser((prevUser) => {
      if (!prevUser) return prevUser;

      return {
        ...prevUser,
        skills: prevUser.skills.filter((skill) => skill !== skillToRemove),
      };
    });
  };

  const handleProfilePictureUpdate = async (formData: FormData) => {
    try {
      const res = await fetch("/api/update-profile-picture", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setFullUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            profilePicture: data.url,
          };
        });
      }
    } catch (error) {
      console.error("Failed to upload profile picture", error);
    }
  };

  const handleSaveSkills = () => {
    if (!fullUser) return;
    updateUserField("skills", fullUser.skills || []);
  };
  async function updateUserField(field: string, value: string | string[]) {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      });

      const data = await response.json();

      if (data.success) {
        setFullUser(data.updatedUser);
        alert('User data updated successfully');

      } else {
        console.error('Error updating user data:', data.error);
      }
    } catch (error) {
      console.error('Error in API call:', error);
    }
  }

  const handleConnect = async () => {
    try {
      const res = await fetch("/api/relationships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: user?.id,
          toUserId: fullUser?.id,
          type: "FRIEND",
        }),
      });

      if (!res.ok) throw new Error("Failed to send contact request");

      const data = await res.json();
      console.log("Contact request sent:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await fetch("/api/relationships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: user?.id,
          toUserId: fullUser?.id,
          type: "FOLLOWER",
        }),
      });

      if (!res.ok) throw new Error("Failed to follow user");

      const data = await res.json();
      console.log("Follow request sent:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!fullUser) {
    return <div>Loading...</div>;
  }




  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 pb-8 text-black font-sans">

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <ProfilePicture
              profilePicture={fullUser.profilePicture}
              onUpdate={handleProfilePictureUpdate}
              isEditable={isEditing}
            />
          </div>

          <div className="space-y-2">
            <EditableField
              value={fullUser.fullName}
              onChange={(newVal) => setFullUser({ ...fullUser, fullName: newVal })}
              isEditing={isEditing}
              fieldName="fullName"
              onUpdateField={updateUserField}
              className="font-bold text-2xl"
            />
            <EditableField
              value={fullUser.professionalTitle ?? ""}
              onChange={(newVal) => setFullUser({ ...fullUser, professionalTitle: newVal })}
              isEditing={isEditing}
              fieldName="professionalTitle"
              placeholder="עדכן את כותרת התפקיד"
              onUpdateField={updateUserField}
              className="font-bold text-lg"
            />

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="text-blue-600" size={18} />
              <EditableField
                value={fullUser.location || "הוסף מיקום"}
                onChange={(newVal) => setFullUser({ ...fullUser, location: newVal })}
                isEditing={isEditing}
                fieldName="location"
                onUpdateField={updateUserField}

              />
            </div>

            <EditableArrayField
              values={fullUser.languagesSpoken}
              onChange={(langs) => setFullUser({ ...fullUser, languagesSpoken: langs })}
              isEditing={isEditing}
              fieldName="languagesSpoken"
              availableItems={languages}
              placeholder="הוסף שפה"
              onUpdateField={updateUserField}
            />
          </div>
        </div>

        {!isEditing && (
          <div className="mt-4 md:mt-0">
            <div className="text-lg font-semibold">{fullUser.fullName}</div>

            <div className="flex gap-2 mt-2">
              {/* Connect / Friend */}
              {friendRelationship ? (
                <Button
                  variant="outline"
                  disabled
                  className="px-6 py-1 text-sm flex items-center gap-1"
                >
                  🤝 {friendRelationship.status}
                </Button>
              ) : (
                <Button onClick={handleConnect} className="px-6 py-1 text-sm">
                  🤝 Contact me
                </Button>
              )}

              {/* Follow */}
              {followerRelationship ? (
                <Button
                  variant="outline"
                  disabled
                  className="px-6 py-1 text-sm flex items-center gap-1"
                >
                  👀 {followerRelationship.status}
                </Button>
              ) : (
                <Button onClick={handleFollow} className="px-6 py-1 text-sm">
                  👀 Follow me
                </Button>
              )}
            </div>
          </div>
        )}



      </div>

      {/* About me */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-2">About me</h2>
        <EditableField
          value={fullUser.personalSummary ?? ""}
          onChange={(newVal) =>
            setFullUser({ ...fullUser, personalSummary: newVal })
          }
          isEditing={isEditing}
          isMultiline={true}
          fieldName="personalSummary"
          onUpdateField={updateUserField}
          placeholder="לחץ כאן כדי לספר עליך קצת"
          className="text-sm text-gray-800 whitespace-pre-line"
        />
      </section>


      <section className="mt-10">
        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <h2 className="text-xl font-bold mb-2">Interest in</h2>
            <EditableArrayField
              values={fullUser.interests}
              onChange={(inter) => setFullUser({ ...fullUser, interests: inter })}
              isEditing={isEditing}
              fieldName="interests"
              availableItems={interests}
              placeholder="הוסף עניין"
              onUpdateField={updateUserField}
            />
          </CardContent>
        </Card>
      </section>

      {/* Projects */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-2">Partner in projects</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {fullUser.projectRelationships && fullUser.projectRelationships.length > 0 ? (
            fullUser.projectRelationships
              .filter(rel => rel.type === 'MEMBER' && rel.project)
              .map((rel, index) => (
                <span key={index} className="border px-3 py-1 rounded-full">
                  {rel.project.title}
                </span>
              ))
          ) : (
            <span>No professional experiences available</span>
          )}
        </div>

      </section>

      {/* Experience */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Experience</h2>
          {isEditing && <Link href="/experience">
            <Button variant="ghost" size="sm">✎</Button>
          </Link>
          }
        </div>

        {fullUser.professionalExperiences && fullUser.professionalExperiences.length > 0 ? (
          fullUser.professionalExperiences.map((exp) => (
            <Card key={exp.id} className="mb-4">
              <CardContent className="p-4">
                <div>
                  <h3 className="font-semibold">{exp.jobTitle}</h3>
                  <p className="text-sm">{exp.company}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} – {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No experience available</div> // אם אין נתונים
        )}
      </section>


      {/* Education */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold mb-2">Education</h2>
          {isEditing && <Link href="/education">
            <Button variant="ghost" size="sm">✎</Button>
          </Link>
          }
        </div>


        {fullUser.educations && fullUser.educations.length > 0 ? (
          fullUser.educations.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} – {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <p className="text-sm">{edu.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No education data available</div>
        )}
      </section>


      {/* Skills */}
      <SkillsSection
        skills={fullUser.skills}
        isEditing={isEditing}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        onSaveChange={handleSaveSkills}
      />
    </div >
  );
}

