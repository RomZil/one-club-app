import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../components/queries/userQueries";
import { UPDATE_USER } from "../components/mutations/userMutations";

export default function EditUserForm({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [loyaltyCards, setLoyaltyCards] = useState(user.loyaltyCards);

  //   const [status, setStatus] = useState(() => {
  //     switch (project.status) {
  //       case "Not Started":
  //         return "new";
  //       case "In Progress":
  //         return "progress";
  //       case "Completed":
  //         return "completed";
  //       default:
  //         throw new Error(`Unknown status: ${project.status}`);
  //     }
  //   });

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { id: user.id, name, email, password, loyaltyCards },
    refetchQueries: [{ query: GET_USER, variables: { id: user.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    debugger;
    if (!name || !email || !password) {
      return alert("Please fill out all fields");
    }

    updateUser(name, email, password, loyaltyCards);
  };

  return (
    <div className="mt-5">
      <h3>Update User Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <textarea
            className="form-control"
            id="description"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <textarea
            className="form-control"
            id="description"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Clubs</label>
          <textarea
            className="form-control"
            id="description"
            value={loyaltyCards}
            onChange={(e) => setLoyaltyCards(e.target.value)}
          ></textarea>
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
