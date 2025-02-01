import React, { useState } from "react";
import { ethers } from "ethers";
import { abi } from "./assets/ClassRegistration.json";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [findId, setFindId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [foundStudent, setFoundStudent] = useState(null);

  const contractAddress = "0x91c75E4c06a4E17Ef3397F221f15aDd56F6ce48f";

  async function getAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function registerStudent() {
    if (typeof window.ethereum !== undefined) {
      await getAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.registerStudent(studentName);
        const receipt = tx.wait();
        toast(`Transaction successful`);
      } catch (err) {
        toast(`Failed Transaction: ${err}`);
      }
    }
  }

  async function getStudent() {
    if (typeof window.ethereum !== "undefined") {
      await getAccounts();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const tx = await contract.getStudent(findId);
        setFoundStudent(tx);
        toast.success(`Transaction successful`);
      } catch (error) {
        toast.error(`Transaction Failed: ${error}`);
      }
    }
  }

  async function removeStudent() {
    if (typeof window.ethereum !== "undefined") {
      await getAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.removeStudent(removeId);
        
        toast.success(`Transaction successful`);
      } catch (error) {
        toast.error(`Transaction Failed: ${error}`);
      }
    }
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue", width: "500px", height: "500px", borderRadius: "5px", boxShadow: "2px 3px 5px purple" }}>
        <div className="App">
          <ToastContainer />
          <h1>Class Registration System</h1>
          <div className="form">
            <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" />
            <button onClick={registerStudent}>Register Student</button>
          </div>
          <div className="form">
            <input type="text" value={findId} onChange={(e) => setFindId(e.target.value)} placeholder="Student ID" />
            <button onClick={getStudent}>Get Student</button>
          </div>
          {foundStudent && <div>{`Found Student: ${foundStudent?.name}`}</div>}
          <div className="form">
            <input type="text" value={removeId} onChange={(e) => setRemoveId(e.target.value)} placeholder="Student ID" />
            <button onClick={removeStudent}>Remove Student</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
