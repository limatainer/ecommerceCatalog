import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from "react-hook-form";
import './styles.css';
import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';
import { getTokenData } from 'util/auth';

type CredentialsDTO = {
  username: string,
  password: string,
};

type LocationState = {
  from: string
}

const Login = () => {

  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/admin' } }

  const { setAuthContextData } = useContext(AuthContext)
  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CredentialsDTO>();

  const history = useHistory();
  // onSubmit
  const onSubmit = (formData: CredentialsDTO) => {
    requestBackendLogin(formData).then(response => {
      saveAuthData(response.data); //quando o login da certo ele salva a resp no localstorage
      // const token = getAuthData().access_token;
      // console.log('TOKEN gerado: ' + token);
      // console.log('SUCESSO', response)
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      })
      history.replace(from) //ele vai subistituir a rota do login pela do que eu tava via endereco
    }).catch((error) => {
      setHasError(true) //isto eh para trabalhar a mensagem de erro condicional e esta configurado na div embaixo
      // console.log('ERROR', error)
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
          Algum campo esta errado
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {/* Input */}
          <input
            {...register("username", {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="text"
            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">{errors.username?.message}</div>
        </div>
        <div className="mb-2">
          <input
            {...register("password", { required: 'Campo obrigatório' })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">{errors.password?.message}</div>
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
