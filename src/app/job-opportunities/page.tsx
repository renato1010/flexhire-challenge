import { createClient } from "@urql/core";
import type { Job, JobSkill, Maybe, Query } from "../../gql/graphql";
import { compensationFormat, positionTypesFormat } from "@/utils";
import { SkillPill } from "../profile/profile-skills";

export default async function JobOpportunities() {
  const flexhireBaseUrl = process.env.FLEXHIRE_API_BASE_URL;
  const flexhireApiKey = process.env.FLEXHIRE_API_KEY;

  const client = createClient({
    url: flexhireBaseUrl!,
    fetchOptions: {
      headers: { "FLEXHIRE-API-KEY": flexhireApiKey! },
    },
  });

  type JobOpportunitiesData = Query;

  const query = `
  query {
    currentUser {
      jobOpportunities(first: 4) {
        nodes {
          title
          description
          positionTypes
          rateMode
          id
          freelancerRate {
            cents
            currency {
              symbol
            }
          }
          minFreelancerRate {
            cents
            currency {
              symbol
            }
          }
          jobSkills {
            id
            required
            requiredYears
            skill {
              name
            }
          }
        }
      }
    }  }
  `;

  const response = await client.query<JobOpportunitiesData, {}>(query, {}).toPromise();
  const pageData = response.data;
  if (!pageData?.currentUser?.jobOpportunities) {
    throw new Error("Error fetching opportunities data");
  }
  const jobOpportunities = pageData.currentUser.jobOpportunities;

  const { nodes: opportunities } = jobOpportunities;

  return (
    <div className="bg-gray-100 container mx-auto pt-5 pb-10">
      <h2 className="font-bold text-xl mt-6">Opportunities</h2>
      <p className="text-slate-400 text-sm mb-6">
        Looks like these job opportunities match your skill set! View job descriptions to learn more.
      </p>
      <div className="flex flex-col space-y-6">
        {opportunities
          ? opportunities.map((opportunity) => {
              if (!opportunity) {
                return null;
              } else {
                return <OpportunityCard key={opportunity.id} opportunity={opportunity} />;
              }
            })
          : null}
      </div>
    </div>
  );
}

type OpportunityCardProps = {
  opportunity: Maybe<Job>;
};
const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  if (!opportunity) return null;
  const { title, positionTypes, rateMode, freelancerRate, minFreelancerRate, jobSkills, description } =
    opportunity;
  return (
    <div className="flex flex-col px-10 py-4 border-2 border-green-300 shadow-md rounded-md">
      <h3 className="underline decoration-gree500 text-xl text-blue-500 font-semibold">{title}</h3>
      <h6 className="text-sm text-slate-700">
        {positionTypesFormat(positionTypes)} -{" "}
        {compensationFormat(freelancerRate, minFreelancerRate, rateMode)}
      </h6>
      <div className="flex flex-wrap py-2">
        {jobSkills.map(({ requiredYears, skill, id }) => {
          if (typeof requiredYears !== "number" || !skill?.name || !id) {
            return null;
          } else return <SkillPill key={id} experience={requiredYears} name={skill.name} />;
        })}
      </div>
      {description ? <p className="text-small text-slate-400 line-clamp-3">{description}</p> : null}
      <div className="flex justify-end my-4">
        <button
          className="bg-green-600 px-3 py-2 text-white text-md font-semibold hover:bg-green-800 
        uppercase rounded-md cursor-not-allowed"
        >
          view & apply
        </button>
      </div>
    </div>
  );
};
