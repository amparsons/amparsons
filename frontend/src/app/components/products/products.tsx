// import { gql } from '@apollo/client';
// import { GetContentResponse, Entry } from '11types';
// import client from '../../libs/apolloClient';

// async function getContent(): Promise<Entry[]> {
//   try {
//     const { data } = await client.query<GetContentResponse>({
//       query: gql`
//         query {
//           entries(section: "pages") {
//             id
//             title
//             ... on general_Entry {
//               id
//               editor
//             }
//           }
//         }
//       `,
//       fetchPolicy: 'network-only', 
//     });
//     console.log('GraphQL Response:', data);

//     return data.entries;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error fetching content:', error.message);
//     } else {
//       console.error('Unknown error occurred while fetching content.');
//     }
//     return [];
//   }
// }

// export default async function Products() {
//   const data = await getContent();

//   return (
//     <div>
//       {data.length > 0 ? (
//         data.map((entry, index) => 
//         <div key={index}>{entry.title}
//           <div dangerouslySetInnerHTML={{ __html: entry.editor }} />
//         </div>)
//       ) : (
//         <p>No content available</p>
//       )}
//     </div>
//   );
// }
