// (async function (): Promise<void> {
//   try {
//     // count
//     const { data, error } = await supabase
//       .from("research-projects-table")
//       .select("*", { count: "exact" });

//     if (error) {
//       throw new Error(error.message);
//     }
//     // console.log("Data:Table:Home", data);
//     // console.log("Count:Table:Home", count);

//     setResearchProjects(data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
