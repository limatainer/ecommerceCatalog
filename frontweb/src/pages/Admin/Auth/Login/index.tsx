import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm, SubmitHandler } from "react-hook-form";
import './styles.css';
import { requestBackendLogin } from 'util/requests';
import { useState } from 'react';

type FormData = {
  username: string,
  password: string,
};

const Login = () => {
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData).then(response => {
      console.log('SUCESSO', response)
    }).catch(error => {
      setHasError(true)
      console.log('ERROR', error)
    })
  }
  /*eu posso tambem tipar assim
  const onSubmit: SubmitHandler<FormData> = data => console.log(data);
  */
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
          Login Informations migh be wrong
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register("username")}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            {...register("password")}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
