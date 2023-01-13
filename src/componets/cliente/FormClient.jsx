import { useState } from "react";
import { insertClient } from "../../services/clietService";

const FormClient = ({ toggle, updateList }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    EMail: "",
    id_category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const isOk = insertClient(formData);
    if (isOk) {
      handleUpdate();
      handleClose();
    }
  };

  const handleClose = () => {
    toggle();
  };

  const handleUpdate = () => {
   updateList();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="EMail"
            value={formData.EMail}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          id_category:
          <input
            type="text"
            name="id_category"
            value={formData.id_category}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button onClick={handleClose}>Cancel</button>
      </form>
    </div>
  );
};
export default FormClient;