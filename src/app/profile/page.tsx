import Image from "next/image";
import { createClient } from "@urql/core";
import { ProfileNavBar } from "./profile-navbar";
import type { Query } from "../../gql/graphql";
import { answersPropsSchema, leftSidePropsSchema, navBarPropsSchema, skillsPropsSchema } from "../utils";
import { ProfileLeftSide } from "./profile-left-side";
import { ProfileSkills } from "./profile-skills";
import { ProfileAnswers } from "./profile-answers";

export default async function Profile() {
  const flexhireBaseUrl = process.env.FLEXHIRE_API_BASE_URL;
  const flexhireApiKey = process.env.FLEXHIRE_API_KEY;

  const client = createClient({
    url: flexhireBaseUrl!,
    fetchOptions: {
      headers: { "FLEXHIRE-API-KEY": flexhireApiKey! },
    },
  });

  type ProfileData = Query;

  const query = `
  query {
    currentUser {
      avatarUrl
      name
      userSkills {
        experience
        skill {
          name
        }
      }
      answers {
        optimizedUrl
        question {
          title
        }
      }
      profile {
        textIntroduction
        createdAt
        availability
        urlGithub
        urlLinkedin
        urlBlog
      }
    }
  }
  `;

  const response = await client.query<ProfileData, {}>(query, {}).toPromise();
  const data = response.data;
  if (!data) {
    throw new Error("Error fetching profile data");
  }
  const currentUser = data["currentUser"];
  if (!currentUser) {
    throw new Error("Error fetching profile data");
  }

  const { avatarUrl, name, profile, userSkills, answers } = currentUser;
  const { textIntroduction, createdAt } = profile!;
  // validate NavBar props: if avatarUrl or name are not string throws
  const navBarPropsOk = navBarPropsSchema.parse({ avatarUrl, name });
  // validate LeftSide props
  const { textIntroduction: introduction, createdAt: memberSince } = leftSidePropsSchema.parse({
    textIntroduction,
    createdAt,
  });
  // validate user skills
  const userSkillsParsed = skillsPropsSchema.parse(userSkills);
  // validate answers
  const answersParsed = answersPropsSchema.parse(answers);
  const navBarSerializedProps = JSON.stringify(navBarPropsOk);
  console.log({ answersParsed });
  return (
    <div className="bg-gray-100">
      <div className="w-full text-white bg-main-color">
        <ProfileNavBar serializedData={navBarSerializedProps} />
      </div>
      {/* End of Navbar  */}

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side  */}
          <ProfileLeftSide
            avatarUrl={navBarPropsOk.avatarUrl}
            textIntroduction={introduction}
            name={navBarPropsOk.name}
            memberSince={memberSince}
          />
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2">
            {/* Skills Section  */}
            <ProfileSkills skills={userSkillsParsed} />
            <div className="my-4"></div>
            {/* Answers section  */}
            <ProfileAnswers answers={answersParsed} />
          </div>
        </div>
      </div>
    </div>
  );
}
