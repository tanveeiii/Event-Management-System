import particlesConfig from '../config/particles-config'
import '../static/index.css'
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Starfield = () => {

  const particlesInit = async (main) => {
    await loadFull(main);
  };
  return (
    <Particles init={particlesInit} id='tsparticles' options={particlesConfig} />
  )
}

export default Starfield