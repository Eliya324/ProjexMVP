"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";




// const user = {
//   profilePicture: null,
//   fullName: 'Chaya Guttman',
//   professionalTitle: 'Full Stack Developer',
//   location: 'Tel Aviv, Israel',
//   contactPhone: '050-1234567',
//   email: 'chaya@example.com',
//   languagesSpoken: ['Hebrew', 'English'],
//   personalSummary: 'Motivated software developer passionate about learning and building impactful products.',
//   skills: ['React', 'Node.js', 'Prisma', 'MySQL'],
//   interests: ['AI', 'Music', 'Education'],
//   professionalExperiences: [
//     {
//       id: 'exp1',
//       jobTitle: 'Frontend Developer',
//       company: 'StartupX',
//       startDate: '2022-01-01',
//       endDate: '2023-06-30',
//       description: 'Built UI components using React and Tailwind.',
//     },
//     {
//       id: 'exp2',
//       jobTitle: 'Backend Intern',
//       company: 'TechCorp',
//       startDate: '2021-07-01',
//       endDate: null,
//       description: 'Worked with Node.js and Prisma to develop APIs.',
//     },
//   ],
//   educations: [
//     {
//       id: 'edu1',
//       degree: 'B.Sc. in Software Engineering',
//       institution: 'JCT Jerusalem College of Technology',
//       startDate: '2019-10-01',
//       endDate: '2023-06-01',
//       description: 'Focused on web development and algorithms.',
//     },
//   ],
//   certifications: [
//     {
//       id: 'cert1',
//       title: 'Full Stack Development',
//       institution: 'Google Career Certificates',
//       year: 2023,
//     },
//   ],
//   recommendationsReceived: [
//     {
//       id: 'rec1',
//       content: 'Chaya is a quick learner and an excellent teammate!',
//     },
//   ],
// };

const fullUserWithRelations = {
  professionalExperiences: true,
  educations: true,
  certifications: true,
};


export default function TalentProfile() {
  const [user, setUser] = useState<Prisma.UserGetPayload<{ include: typeof fullUserWithRelations }> | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/profile`);


      const data = await res.json();
      console.log("data", data);
      setUser(data);
    }

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 pb-8 text-black font-sans">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300">
            {user.profilePicture ? (
              <Image src={user.profilePicture} alt="Profile" width={128} height={128} />
            ) : (
              <Image src="/default-profile.png" alt="Default Profile" width={128} height={128} />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-lg font-semibold text-violet-950">{user.professionalTitle}</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image key={i} src="/star-full.svg" alt="Star" width={16} height={16} />
                ))}
              </div>
              <span>(54)</span>
              <span>• {user.location}</span>
              <span>• {user.languagesSpoken ? user.languagesSpoken.join(', ') : 'No languages specified'}</span>
            </div>
          </div>
        </div>

        {user.fullName == "Chaya Guttman" && <div className="mt-4 md:mt-0">
          <div className="text-lg font-semibold">{user.fullName}</div>
          <Button className="mt-1 px-6 py-1 text-sm">Contact me</Button>
          <Button className="mt-1 px-6 py-1 text-sm">Follow me</Button>
        </div>
        }
      </div>

      {/* About me */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-2">About me</h2>
        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <p>{user.personalSummary}</p>
            <ul className="list-disc list-inside">
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))
              ) : (
                <li>No interests specified</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Projects */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-2">Partner in projects</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {user.professionalExperiences && user.professionalExperiences.length > 0 ? (
            user.professionalExperiences.map((exp, index) => (
              <span key={index} className="border px-3 py-1 rounded-full">{exp.company}</span>
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
          <Link href="/step3form">
            <Button variant="ghost" size="sm">✎</Button>
          </Link>
        </div>

        {/* בדיקה אם professionalExperiences קיים ואינו ריק */}
        {user.professionalExperiences && user.professionalExperiences.length > 0 ? (
          user.professionalExperiences.map((exp) => (
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
          <Link href="/step3form">
            <Button variant="ghost" size="sm">✎</Button>
          </Link>
        </div>

        {/* בדיקה אם educations קיים ואינו ריק */}
        {user.educations && user.educations.length > 0 ? (
          user.educations.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} – {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}

                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No education data available</div> // אם אין נתונים
        )}
      </section>


      {/* Skills */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <Card>
          <CardContent className="p-4 flex flex-wrap gap-2">
            {/* בדיקה אם skills קיים ומכיל נתונים */}
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span key={index} className="border px-3 py-1 rounded-full text-sm bg-gray-100">
                  {skill}
                </span>
              ))
            ) : (
              <div>No skills available</div> // אם אין נתונים
            )}
          </CardContent>
        </Card>

      </section>
    </div>
  );
}
