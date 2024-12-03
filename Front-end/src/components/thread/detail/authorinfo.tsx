// // src/components/thread/detail/authorinfo.tsx
// import React from 'react';
// import { Author } from '../../../types/thread';

// interface AuthorInfoProps {
//   author: Author;
// }

// const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => {
//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
//         Author Information
//       </h2>
//       <div className="flex items-center">
//         <img
//           src={author.profile.avatarUrl}
//           alt={author.username}
//           className="w-16 h-16 rounded-full mr-4"
//         />
//         <div>
//           <p className="text-xl text-gray-800 dark:text-gray-100">
//             {author.username}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthorInfo;
