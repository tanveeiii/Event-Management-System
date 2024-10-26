import Particles from '@tsparticles/react'
import particlesConfig from './particles-config'
import './index.css'

const Starfield = () => {
  return (
    <Particles id='tsparticles' options={particlesConfig}>

    </Particles>
  )
}

export default Starfield