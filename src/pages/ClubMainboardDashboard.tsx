import { useEffect, useState } from "react";
import { Link, Router, redirect } from "react-router-dom";

type Program = {
  id: number;
  name: string;
  program_manager_name: string;
  program_manager_phone: string;
  budget: number;
  proposal_link: string;
  ppf_link: string;
  date: string;
  duration: number;
  venue: string;
  total_participants: number;
  program_status: string;
  sidenotes: string;
  year: number;
};

export default function ClubMainboardDashboard() {
  const [programs, setPrograms] = useState<Program[] | undefined>([]);

  async function deleteProgram(programId: number) {
    const req = await fetch("http://localhost:8081/api/program", {
      method: "delete",
      body: JSON.stringify({ programId: programId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("foo");
    const res = req.status;
    if (res == 200) {
      window.alert("Successfully remove program");
      setPrograms(programs?.filter((program) => program.id !== programId));
    } else {
      window.alert("Something is wrong");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/programs/2021");
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.log("cannot fetch data");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="p-20">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold mb-5">
            Club Mainboard Dashboard
          </h1>
          <div>
            <Link to={"/club-mainboard-dashboard/add-program"}>
              <button className="p-3 rounded-xl bg-blue-500 text-white">
                Add Program
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <table className="table-fixed border-2 w-full">
            <thead>
              <tr className="bg-slate-500 text-white m-3">
                <th>Program ID</th>
                <th>Name</th>
                <th>Program manager </th>
                <th>Phone number</th>
                <th>Date</th>
                <th>Day remaining</th>
                <th>Proposal Link</th>
                <th>PPF link</th>
                <th>Venue</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {programs?.map((program) => (
                <tr key={program?.id} className="border-2 border-slate-300 p-5">
                  <td className="text-center">{program?.id}</td>
                  <td className="text-center">{program?.name}</td>
                  <td className="text-center">
                    {program?.program_manager_name}
                  </td>
                  <td className="text-center">
                    {program?.program_manager_phone}
                  </td>
                  <td className="text-center">{program?.date}</td>
                  <td className="text-center">days</td>
                  <td className="text-center">
                    <a
                      className="text-blue-700 hover:opacity-80"
                      href={program?.proposal_link}
                    >
                      {program?.proposal_link}
                    </a>
                  </td>
                  <td className="text-center">
                    <a
                      className="text-blue-700 hover:opacity-80"
                      href={program?.ppf_link}
                    >
                      {program?.ppf_link}
                    </a>
                  </td>
                  <td className="text-center">{program?.venue}</td>
                  <td>
                    <div className="flex">
                      <Link
                        to={`/club-mainboard-dashboard/program/${program?.id}`}
                        className="p-2 rounded-2xl bg-blue-400 text-white"
                      >
                        Detail
                      </Link>
                      <button
                        className="p-2 rounded-2xl bg-red-400 text-white ml-3"
                        onClick={() => deleteProgram(program?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
