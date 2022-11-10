import Image from 'next/image';
import appPreviewImage from '../assets/app-copa-preview.png';
import logoImg from '../assets/logo.svg';
import avatarUsersImg from '../assets/users-avatar-example.png';
import iconCheckSvg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {

  const [poolName, setPoolName] = useState('');

  async function handleSubmitPool(e: FormEvent) {
    e.preventDefault();
    if (poolName.trim() == '')
      return;
    try {
      const response = await api.post('pools', { title: poolName });
      // console.log(response.data);
      alert(`Bolão ${poolName} criado com sucesso.`);
      navigator.clipboard.writeText(response.data.code);
      setPoolName('');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar bolão');
    }


  }
  return (
    <div className="my-20 max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-20 items-center">
      <main>
        <Image src={logoImg} alt="NLW copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image src={avatarUsersImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={handleSubmitPool}>
          <input
            value={poolName}
            onChange={e => setPoolName(e.target.value)}
            onSubmit={handleSubmitPool}
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-white"
          />
          <button type="submit" className="px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-small uppercase hover:bg-yellow-700 transition duration-300 ">Criar meu bolão</button>
        </form>

        <p
          className="text-gray-300 mt-4 text-sm leading-re"
        >
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between">
          <div className="flex items-center gap-6">
            <Image src={iconCheckSvg} alt="" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold" >
                +{props.poolCount}
              </span>
              <span className="text-white text-base">
                Bolões criados
              </span>
            </div>
          </div>
          <div className="flex border-l h-auto border-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={iconCheckSvg} alt="" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold">
                +{props.guessCount}
              </span>
              <span className="text-white text-base">
                Palpites enviados
              </span>
            </div>
          </div>
        </div>

      </main>

      <Image
        src={appPreviewImage}
        alt="Dois celulares exibindo uma preview do app da nlw"
        quality={100}
      />

    </div>
  );
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse,
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ]);
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  };
};