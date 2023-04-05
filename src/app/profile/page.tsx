import { createClient } from "@urql/core";
import { cookies } from "next/headers";
import { flexhireBaseUrl, flexhireApiKey } from "@/utils";
import { ProfileNavBar } from "./profile-navbar";
import type { Query } from "../../gql/graphql";
import { answersPropsSchema, leftSidePropsSchema, navBarPropsSchema, skillsPropsSchema } from "../../utils";
import { ProfileLeftSide } from "./profile-left-side";
import { ProfileSkills } from "./profile-skills";
import { ProfileAnswers } from "./profile-answers";
import datastore from "@/db/datastore";
import { Keys } from "@/db/types";

export default async function Profile() {
  const keyRow = await datastore<Keys>("keys").first("value");
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
  const pageData = response.data;
  if (!pageData?.currentUser) {
    throw new Error("Error fetching profile data");
  }
  const currentUser = pageData.currentUser;

  const { avatarUrl, name, profile, userSkills, answers } = currentUser;
  const { textIntroduction, createdAt } = profile!;
  // validate all props that will be passed to children components
  //TODO: create a error.tsx to handle any possible error thrown by schema validation
  const navBarPropsOk = navBarPropsSchema.parse({ avatarUrl, name });
  const { textIntroduction: introduction, createdAt: memberSince } = leftSidePropsSchema.parse({
    textIntroduction,
    createdAt,
  });
  const userSkillsParsed = skillsPropsSchema.parse(userSkills);
  const answersParsed = answersPropsSchema.parse(answers);
  // serialize props that will be passed to "client" clild component
  const navBarSerializedProps = JSON.stringify(navBarPropsOk);
  return (
    <div className="bg-gray-100">
      <div className="w-full text-white bg-main-color">
        <ProfileNavBar serializedData={navBarSerializedProps} />
      </div>
      <div className="container mx-auto my-5 p-5">
        <p>apiKey: {keyRow?.value}</p>
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
