import { useState } from "react";

export default function AddProgramPage() {
  const [name, setName] = useState("");
  const [programManagerName, setProgramManagerName] = useState("");
  const [programManagerPhone, setProgramManagerPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [proposalLink, setProposalLink] = useState("");
  const [ppfLink, setPpfLink] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");
  const [totalParticipants, setTotalParticipants] = useState("");
  const [programStatus, setProgramStatus] = useState("");
  const [sidenotes, setSidenotes] = useState("");
  const [year, setYear] = useState("");

  function addProgram(e: any) {
    e.preventDefault();
    const data = {
      name: name,
      program_manager_name: programManagerName,
      program_manager_phone: programManagerPhone,
      budget: budget,
      proposal_link: proposalLink,
      ppf_link: ppfLink,
      date: date,
      duration: duration,
      venue: venue,
      total_participants: totalParticipants,
      program_status: programStatus,
      sidenotes: sidenotes,
      year: year,
    };

    try {
      fetch("http://localhost:8081/api/program", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.alert("Successfully added new program")
    } catch (err) {
      console.log("cannot add new program");
    }
  }
  return (
    <>
      <div className="p-20">
        <h1 className="text-4xl font-semibold mb-5">Add New Program</h1>
        <form onSubmit={addProgram}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block">
                Name:
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="program_manager_name" className="block">
                Program manager name:{" "}
                <input
                  required
                  type="text"
                  name="program_manager_name"
                  id="program_manager_name"
                  onChange={(e) => setProgramManagerName(e.target.value)}
                />
              </label>
              <label htmlFor="program_manager_phone" className="block">
                Program manager phone:{" "}
                <input
                  required
                  type="text"
                  name="program_manager_phone"
                  id="program_manager_phone"
                  onChange={(e) => setProgramManagerPhone(e.target.value)}
                />
              </label>
              <label htmlFor="budget" className="block">
                Budget:{" "}
                <input
                  required
                  type="number"
                  name="budget"
                  id="budget"
                  onChange={(e) => setBudget(e.target.value)}
                />
              </label>
              <label htmlFor="proposal_link" className="block">
                Proposal link:{" "}
                <input
                  required
                  type="text"
                  name="proposal_link"
                  id="proposal_link"
                  onChange={(e) => setProposalLink(e.target.value)}
                />
              </label>
              <label htmlFor="ppf_link" className="block">
                PPF link:{" "}
                <input
                  required
                  type="text"
                  name="ppf_link"
                  id="ppf_link"
                  onChange={(e) => setPpfLink(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="date" className="block">
                Date:{" "}
                <input
                  required
                  type="text"
                  name="date"
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label htmlFor="duration" className="block ">
                Duration:{" "}
                <input
                  required
                  type="text"
                  name="duration"
                  id="duration"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>
              <label htmlFor="venue" className="block ">
                Venue:{" "}
                <input
                  required
                  type="text"
                  name="venue"
                  id="venue"
                  onChange={(e) => setVenue(e.target.value)}
                />
              </label>
              <label htmlFor="total_participants" className="block ">
                Total participants:{" "}
                <input
                  required
                  type="number"
                  name="total_participants"
                  id="total_participants"
                  onChange={(e) => setTotalParticipants(e.target.value)}
                />
              </label>
              <label htmlFor="program_status" className="block ">
                Program status:{" "}
                <input
                  required
                  type="text"
                  name="program_status"
                  id="program_status"
                  onChange={(e) => setProgramStatus(e.target.value)}
                />
              </label>
              <label htmlFor="sidenotes" className="block ">
                Sidenotes:{" "}
                <input
                  required
                  type="text"
                  name="sidenotes"
                  id="sidenotes"
                  onChange={(e) => setSidenotes(e.target.value)}
                />
              </label>
              <label htmlFor="year" className="block ">
                Year:{" "}
                <input
                  required
                  type="number"
                  name="year"
                  id="year"
                  onChange={(e) => setYear(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button className="p-3 bg-blue-500 rounded-xl">
            Add new program
          </button>
        </form>
      </div>
    </>
  );
}
