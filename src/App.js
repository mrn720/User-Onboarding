import * as yup from 'yup'
import { schema } from './validation/formSchema.js'
import './App.css';
import { useState, useEffect } from 'react'
import Form from './components/Form.js'
import User from './components/User.js'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setValues] = useState(formValueStart);
  const [formErrors, setFormErrors] = useState(errorsStart);
  const [disabled, setDisabled] = useState(disabledStart);


const getUsers = () => {
  axios.get("https://reqres.in/api/users")
    .then(({data}) => setUsers(data))
    .catch((err) => console.log("Error retrieving User:", err));
};

const postNewUser = (newUser) => {
  axios.post("https://reqres.in/api/users", newUser)
    .then(({data}) => setUsers([data, ...users]))
    .catch((err) => console.log("Error Retrieving New User", err))

};

  const inputChange = (name, value) => {
    yup.reach(schema, name).validate(value).then(() =>
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      )
      .catch((err) =>
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      );
      setValues({
      ...formValues,
      [name]: value 
    });
  };


  const formSubmit = () => {
    const terms = [];
    Object.keys(formValues).filter((key) => key === "yes").forEach((key) => {
      const value = formValues[key];
      if (value) {
        terms.push(key);
      }
    });

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser);
    setValues(formValueStart);
  }


  useEffect(() => {
    getUsers();
  },[]);


  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);


  return (
    <div className="App">

      <Form values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors}/>

      {[users].map((usrx) => {
        return <User key={usrx.id} info={usrx} />;
      })}
    </div>
  );
}

export default App;

const formValueStart = {
  name: '',
  email: '',
  password: '',
}

const disabledStart = true;

const errorsStart = {
  name: '',
  email: '',
  password: '',
}
 