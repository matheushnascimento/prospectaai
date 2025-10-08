import "@/global.css";
import TallyCounter from "@/components/TallyCounter";
import { useState } from "react";
export default function App() {
  const [prospects, setProspects] = useState(0);
  const [leads, setLeads] = useState(0);
  const [customers, setCustomers] = useState(0);

  const date = getDate();

  const updateMetric = {
    updateProspects: () => {
      setProspects((prevValue) => prevValue + 1);
    },
    updateLeads: () => {
      setLeads((prevValue) => prevValue + 1);
    },
    updateCustomers: () => {
      setCustomers((prevValue) => prevValue + 1);
    },
  };

  function getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ".5rem",
          padding: "1rem",
          borderRadius: ".6rem",
          backgroundColor: "rgba(255,255,255, .5)",
          boxShadow: ".4rem .4rem .4rem rgba(0,0,0,.25)",
        }}
      >
        <p>{date}</p>
        <TallyCounter
          updateValue={(newValue) => updateMetric.updateProspects(newValue)}
          title="Prospectos"
        />
        <TallyCounter
          updateValue={(newValue) => updateMetric.updateLeads(newValue)}
          title="Leads"
        />
        <TallyCounter
          updateValue={(newValue) => updateMetric.updateCustomers(newValue)}
          title="Clientes"
        />
      </div>
    </div>
  );
}
