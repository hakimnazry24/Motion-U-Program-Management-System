import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export default function ProgramPage() {
  let params = useParams();
  const [program, setProgram] = useState<Program | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/api/program/${params.programId}`
        );
        const data = await res.json();
        setProgram(data);
      } catch (err) {
        console.log("error cannot fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="p-10">
        <h1 className="text-4xl font-semibold mb-10">{program?.name}</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Program Name</h2>
            <p>{program?.name}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Date</h2>
            <p>{program?.date}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Program Manager</h2>
            <p>{program?.program_manager_name}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Day remaining</h2>
            <p></p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">
              Current program status
            </h2>
            <p>{program?.program_status}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Total Budget</h2>
            <p>{program?.budget}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Proposal link</h2>
            <p>{program?.proposal_link}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">PPF link</h2>
            <p>{program?.ppf_link}</p>
          </div>
          <div className="shadow-md rounded-xl p-5 bg-blue-300">
            <h2 className="text-xl font-semibold mb-2">Sidenotes</h2>
            <p>{program?.sidenotes}</p>
          </div>
        </div>
      </div>
    </>
  );
}
