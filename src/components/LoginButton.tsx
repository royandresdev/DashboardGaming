const apiUrl = 'http://localhost:3000/';

const LoginButton = () => {
  const handleRedirectToLoginSteam = () => {
    window.location.href = `${apiUrl}auth/steam`;
  };

  return (
    <button onClick={handleRedirectToLoginSteam} className="bg-blue-600 text-white px-4 py-2 rounded">
      Iniciar sesión con Steam
    </button>
  );
}
export default LoginButton
