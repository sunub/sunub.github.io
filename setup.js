import dotenv from "dotenv";
import { sql } from "@vercel/postgres";

dotenv.config();

// (async () => {
//   const redirectsTable = await sql`
//     SELECT * FROM redirects;
//   `;

//   if (redirectsTable.fields.length > 0) {
//     console.log(
//       "Redirects의 데이터베이스 테이블이 존재하여 새로운 테이블을 생성하지 않았습니다.",
//     );
//   } else {
//     try {
//       await sql`
//         CREATE TABLE IF NOT EXISTS redirects (
//           id SERIAL PRIMARY KEY,
//           source VARCHAR(255) NOT NULL,
//           destination VARCHAR(255) NOT NULL,
//           permanent BOOLEAN NOT NULL
//         );
//       `;
//       console.log(
//         "Redirects의 데이터베이스 테이블이 성공적으로 생성되었습니다.",
//       );
//     } catch (error) {
//       console.log("Redirects의 데이터베이스 테이블 생성에 실패했습니다.");
//       console.error(error);
//     }
//   }

//   const viewsTable = await sql`
//     SELECT * FROM views;
//   `;

//   if (viewsTable.fields.length > 0) {
//     console.log(
//       "Views의 데이터베이스 테이블이 존재하여 새로운 테이블을 생성하지 않았습니다.",
//     );
//   } else {
//     try {
//       await sql`
//       CREATE TABLE IF NOT EXISTS views (
//         slug VARCHAR(255) NOT NULL,
//         count INTEGER NOT NUll
//         );
//         `;
//       console.log("Views의 데이터베이스 테이블이 성공적으로 생성되었습니다.");
//     } catch (error) {
//       console.log("Views의 데이터베이스 테이블 생성에 실패했습니다.");
//       console.error(error);
//     }
//   }
// })();

// (async () => {
//   try {
//     await sql`
//       CREATE TABLE IF NOT EXISTS blog (
//         id SERIAL PRIMARY KEY,
//         metdata JSONB NOT NULL,
//         slug VARCHAR(255) NOT NULL,
//         content TEXT NOT NULL
//       );
//     `;
//     console.log("Blog의 데이터베이스 테이블이 성공적으로 생성되었습니다.");
//   } catch (error) {
//     console.log("Blog의 데이터베이스 테이블 생성에 실패했습니다.");
//     console.error(error);
//   }
// })();
