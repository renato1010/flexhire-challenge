This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Flexhire Challenge

Credits:

- Profile page Tailwind design based on: [Profile Page](https://tailwindcomponents.com/component/profile-page)  
  author: [jamesbhatta](https://github.com/jamesbhatta)
- Set Key page Tailwind design based on: [Tailwind CSS Password and confirm validation](https://tailwindcomponents.com/component/password-and-confirm-validation)  
  author: [Sisableng](https://github.com/Sisableng)

**To run project locally will need few env vars**  
![env vars](https://losormorpino-public-media.s3.us-east-2.amazonaws.com/6800z31.png)

\*\* Vercel deployed version at: https://flexhire-challenge.vercel.app

## Profile Page

<div align="center">
  <img src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/7t00cox.png" width="800" alt="profile page">
</div>

### [Nextjs-React 18 server components](https://beta.nextjs.org/docs/rendering/server-and-client-components#server-components) were used

1- Query the default api-key as env var  
2- If saved api key available and saved before 1 hour, uses saved key  
3- [urql core-node](https://formidable.com/open-source/urql/docs/basics/core/) were used to fetch data from flexhire graphql api

```ts
  const keyRow = await redis.hgetall<FlexhireData>(process.env.REDIS_HSET_KEY_NAME!);
  const currentApiKey = keyRow?.key;
  const updatedAt = keyRow?.updatedAt;
  // security measure; only the keys stored less than one hour ago are used
  const isFresh = isOneHourFresh(updatedAt);
  let response: OperationResult<Query, {}>;
  try {
    const client = createClient({
      url: flexhireBaseUrl!,
      fetchOptions: {
        headers: { "FLEXHIRE-API-KEY": isFresh && currentApiKey ? currentApiKey : flexhireApiKey! },
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
    response = await client.query<ProfileData, {}>(query, {}).toPromise();
```

<div align="center">
  <h3>Screen cast</h3>
  <img src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/t000j06.png" width="800" alt="use another key">
</div>

## Job Applications Page

### Since still do not have Applications records

<div align="center">
  <h3>No job applications at the moment</h3>
  <img src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/0e00ie4.png" width="800" alt="no applications">
</div>

### So I queryed the **job opportunities** instead

```ts
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
```

<div align="center">
  <h3>Job opportunities page</h3>
  <img src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/n510iuf.png" width="800" alt="job opportunities">
</div>

## Set Web Hook

### Created a Webhook based on GraphQL schema for input type `CreateWebhookInput`.

> HTTP POST requests with JSON bodies will be sent to this URL. The fields on  
> the body are 'event_name', 'timestamp' (unix integer format) and 'records'  
> (array of string IDs of related records)

The webhook url of deployed project looks like: POST `https://flexhire-challenge.vercel.app/api/webhook`

### webhook flow goes like this

1- Nextjs route handler `/api/webhook` receives a POST HTTP
2- handler get's request body and validates against [ZOD schema](https://zod.dev/)  
3- after validation, handlers produce [@upstash/kafka](https://docs.upstash.com/kafka) message  
4- Next `hook-events` page reads(consume) [@upstash/kafka](https://docs.upstash.com/kafka) messages **not reactive-wise**

<div align="center">
  <h3>Webhook flow</h3>
  <img src="https://losormorpino-public-media.s3.us-east-2.amazonaws.com/rp00eff.png" width="800" alt="webhook">
</div>

demo: [check video](https://losormorpino-public-media.s3.us-east-2.amazonaws.com/demo-flexhire-webhook-flow.mp4)
